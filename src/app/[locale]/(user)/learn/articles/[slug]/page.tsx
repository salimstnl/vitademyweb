import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import {
  getArticleBySlugAction,
  getArticleCommentsAction,
} from "@/lib/actions/articleActions";
import ArticleAdminActions from "@/components/article-admin-actions";
import ArticleContent from "@/components/article-content";
import ArticleComments from "@/components/article-comments";
import ArticleOthers from "@/components/article-others";

type PageProps = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
};

export default async function ArticleDetail({ params }: PageProps) {
  const { slug } = await params;

  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  const articleResult = await getArticleBySlugAction(slug);
  if (!articleResult.success || !articleResult.article) {
    return <p>Article Not Found</p>;
  }

  const article = articleResult.article;
  const commentsResult = await getArticleCommentsAction(article.id);

  return (
    <div className="px-5">
      <div className="max-w-3xl mx-auto py-8">
        {role === "ADMIN" && (
          <ArticleAdminActions articleId={article.id} slug={article.slug} />
        )}

        <ArticleContent article={article} />

        <ArticleComments
          article={article}
          initialComments={commentsResult.articleComments ?? []}
          loading={false}
        />

        <ArticleOthers />
      </div>
    </div>
  );
}
