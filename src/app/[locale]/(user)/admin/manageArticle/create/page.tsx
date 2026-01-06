"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

import { IoIosAdd } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/Button";

import CreateArticleCategoryDialog from "@/components/create-article-category-dialog";
import DeleteArticleCategoryDialog from "@/components/delete-article-category-dialog";
import Tiptap from "@/components/wysiwyg/tiptap";
import Link from "next/link";
import {
  createArticleAction,
  getArticleCategoriesAction,
} from "@/lib/actions/articleActions";
import { toast } from "sonner";
import { useUploadThing } from "@/utils/uploadthing";
import { ImageUploader } from "@/components/ui/image-uploader";
import { ArticleCategory } from "@prisma/client";

export default function CreateArticle() {
  const [pending, setPending] = useState(false);
  const [openCreateCategory, setOpenCreateCategory] = useState(false);
  const [openDeleteCategory, setOpenDeleteCategory] = useState(false);

  const [categories, setCategories] = useState<ArticleCategory[] | null>(null);
  const [categoryId, setCategoryId] = useState("");

  // Get article category
  useEffect(() => {
    async function load() {
      const result = await getArticleCategoriesAction();
      if (result.success) {
        setCategories(result.categories);
      }
    }
    load();
  }, []);
  const selectedCategory = categories?.find((c) => c.id === categoryId);

  // Handle Upload Thumbnail
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { startUpload } = useUploadThing("imageUploader");

  // Form Data
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [content, setContent] = useState("");

  type ArticleStatus = "PUBLISHED" | "DRAFT";
  async function handleSubmit(status: ArticleStatus) {
    setPending(true);

    let thumbnailUrl = null;

    if (selectedFile) {
      const uploadRes = await startUpload([selectedFile]);
      thumbnailUrl = uploadRes?.[0]?.url;
    }

    const result = await createArticleAction({
      categoryId,
      title,
      shortDesc,
      content,
      thumbnailUrl,
      status,
    });

    setPending(false);

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Article successfully saved!");
  }

  return (
    <div className="p-10">
      <CreateArticleCategoryDialog
        open={openCreateCategory}
        onOpenChange={setOpenCreateCategory}
      />
      <DeleteArticleCategoryDialog
        open={openDeleteCategory}
        onOpenChange={setOpenDeleteCategory}
        category={selectedCategory}
      />
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-5">
          <div>
            <h1 className="text-3xl font-bold">Create Article</h1>
            <h3 className="text-neutral-400">Time to create some articles</h3>
          </div>
          <div className="grid gap-5 py-5">
            <div className="grid gap-3">
              <Label htmlFor="category">Category</Label>
              <div className="flex gap-2">
                <input
                  type="hidden"
                  name="categoryId"
                  value={categoryId ?? ""}
                />
                <Select onValueChange={(value) => setCategoryId(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      {categories
                        ? categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))
                        : null}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  className="bg-blue-500 text-white px-5 py-3 rounded border-0"
                  onClick={() => setOpenCreateCategory(true)}
                >
                  <IoIosAdd />
                </Button>
                <Button
                  type="button"
                  className="bg-red-500 text-white px-5 py-3 rounded border-0"
                  onClick={() => setOpenDeleteCategory(true)}
                >
                  <FaTrash />
                </Button>
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                name="title"
                placeholder=""
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="shortDesc">Short Description</Label>
              <Input
                name="shortDesc"
                placeholder=""
                onChange={(e) => setShortDesc(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start gap-3">
              <Label htmlFor="thumbnail">Upload Thumbnail</Label>
              <ImageUploader onFileSelected={setSelectedFile} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="content">Content</Label>
              <Tiptap content={content} onChange={setContent} />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            disabled={pending}
            onClick={() => handleSubmit("PUBLISHED")}
          >
            {pending ? "Saving..." : "Save"}
          </Button>

          <Button
            type="button"
            disabled={pending}
            onClick={() => handleSubmit("DRAFT")}
          >
            {pending ? "Saving..." : "Save as Draft"}
          </Button>

          <Link href="/admin/manageArticle">
            <Button disabled={pending}>Cancel</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
