"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { redirect } from "next/navigation";
import { authOptions } from "../../auth";
import { getServerSession } from "next-auth";

import { UTApi } from "uploadthing/server";
import { Prisma } from "@prisma/client";
const utapi = new UTApi();

export async function createArticleCategoryAction(data: {
  categoryName: string;
}) {
  var slugify = require("slugify");

  const existingCategory = await prisma.articleCategory.findUnique({
    where: {
      name: data.categoryName,
    },
  });

  if (existingCategory) {
    return { error: "That slug already exists." };
  }

  const slug = slugify(data.categoryName, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: true, // strip special characters except replacement, defaults to `false`
    locale: "vi", // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
  await prisma.articleCategory.create({
    data: {
      name: data.categoryName,
      slug: slug,
    },
  });

  return { success: true };
}

export async function getArticleCategoriesAction() {
  const categories = await prisma.articleCategory.findMany({
    orderBy: { name: "asc" },
  });

  return { success: true, categories };
}

export async function deleteArticleCategoryAction(articleCategoryId: string) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  // get article first
  const articleCategory = await prisma.articleCategory.findUnique({
    where: { id: articleCategoryId },
  });

  if (!articleCategory) {
    return { error: "Article category not found or already deleted!" };
  }

  // detect if there are still articles with the category admin wants to delete
  const articleCount = await prisma.article.count({
    where: { articleCategoryId },
  });

  if (articleCount > 0) {
    return {
      error: `Cannot delete category. ${articleCount} article(s) are still using this category.`,
    };
  }

  // delete article row
  await prisma.articleCategory.delete({
    where: { id: articleCategoryId },
  });

  return { success: true };
}

export async function createArticleAction(data: {
  categoryId: string;
  title: string;
  shortDesc: string;
  thumbnailUrl?: string | null;
  content: string;
}) {
  // Fetch user session
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: "User not authenticated! Please relog." };
  }

  const role = session?.user?.role;
  if (role !== "ADMIN") return { error: "User has no authorization." };

  if (!data.categoryId) return { error: "Please select category!" };
  if (!data.title) return { error: "Please input title!" };
  if (!data.shortDesc) return { error: "Please input short description!" };
  if (!data.thumbnailUrl) return { error: "Please upload a thumbnail!" };
  if (!data.content) return { error: "Please input content!" };

  var slugify = require("slugify");
  const slug = slugify(data.title, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: true, // strip special characters except replacement, defaults to `false`
    locale: "vi", // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });

  const existingArticle = await prisma.article.findUnique({
    where: {
      slug: slug,
    },
  });

  if (existingArticle)
    return { error: "Article already exists! Please input a new title!" };

  try {
    const userId = session?.user?.id;
    await prisma.article.create({
      data: {
        title: data.title,
        slug,
        thumbnail: data.thumbnailUrl,
        shortDesc: data.shortDesc,
        content: data.content,
        articleCategory: {
          connect: { id: data.categoryId },
        },
        author: {
          connect: { id: userId },
        },
      },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return { error: "That slug already exists." };
    }

    return { error: error.message || "Failed to create the blog." };
  }

  revalidatePath("/");
  redirect(`/admin/manageArticle`);
}

export type ArticleWithRelations = Prisma.ArticleGetPayload<{
  include: {
    author: true;
    articleCategory: true;
  };
}>;

export async function getArticleAction(categoryId?: string) {
  try {
    const articles: ArticleWithRelations[] = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
      where: categoryId ? { articleCategoryId: categoryId } : {},
      include: {
        author: true,
        articleCategory: true,
      },
    });

    return {
      success: true,
      articles,
    };
  } catch (error) {
    console.error("Error fetching articles:", error);

    return {
      success: false,
      error: "Failed to load articles",
    };
  }
}

export async function getArticleBySlugAction(slug: string) {
  try {
    const article = await prisma.article.findUnique({
      where: { slug },
      include: {
        author: true,
        articleCategory: true,
      },
    });

    if (!article) {
      return { success: false, error: "Article not found" };
    }

    return {
      success: true,
      article: article ?? null,
    };
  } catch (error) {
    console.error("Error fetching articles:", error);

    return {
      success: false,
      error: "Failed to load articles",
    };
  }
}

export async function deleteArticleAction(articleId: string) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  // get article first
  const article = await prisma.article.findUnique({
    where: { id: articleId },
    select: { thumbnail: true },
  });

  if (!article) {
    return { error: "Article not found" };
  }

  // delete thumbnail from UploadThing
  if (article.thumbnail) {
    const fileKey = article.thumbnail.split("/f/")[1];
    if (fileKey) {
      await utapi.deleteFiles(fileKey);
    }
  }

  // delete article row
  await prisma.article.delete({
    where: { id: articleId },
  });

  return { success: true };
}

export async function editArticleAction(data: {
  id: string;
  title: string;
  shortDesc: string;
  content: string;
  categoryId: string;
  thumbnailUrl?: string | null;
}) {
  if (!data.id) return { error: "Invalid article." };
  if (!data.categoryId) return { error: "Please select category!" };
  if (!data.title) return { error: "Please input title!" };
  if (!data.shortDesc) return { error: "Please input short description!" };
  if (!data.content) return { error: "Please input content!" };
  if (!data.thumbnailUrl) return { error: "Please upload a thumbnail!" };

  // fetch existing article
  const existingArticle = await prisma.article.findUnique({
    where: { id: data.id },
    select: { thumbnail: true },
  });

  if (!existingArticle) return { error: "Article not found." };

  // delete old thumbnail if there are changes
  if (
    existingArticle.thumbnail &&
    existingArticle.thumbnail != data.thumbnailUrl
  ) {
    const fileKey = existingArticle.thumbnail.split("/f/")[1];
    if (fileKey) {
      await utapi.deleteFiles(fileKey);
    }
  }

  var slugify = require("slugify");
  const slug = slugify(data.title, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: true, // strip special characters except replacement, defaults to `false`
    locale: "vi", // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });

  try {
    await prisma.article.update({
      where: { id: data.id },
      data: {
        slug: slug,
        title: data.title,
        shortDesc: data.shortDesc,
        content: data.content,
        thumbnail: data.thumbnailUrl,
        articleCategoryId: data.categoryId,
      },
    });

    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Failed to update article." };
  }
}
