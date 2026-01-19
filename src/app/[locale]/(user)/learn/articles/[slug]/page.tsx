import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { getArticleBySlugAction } from "@/lib/actions/articleActions";
import ArticleAdminActions from "@/components/article-admin-actions";
import ArticleContent from "@/components/article-content";
import ArticleComment from "@/components/article-comment";
import ArticleOthers from "@/components/article-others";

export default async function ArticleDetail({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;

  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  const result = await getArticleBySlugAction(slug);

  if (!result.success || !result.article) {
    return <p>Article Not Found</p>;
  }

  const article = result.article;

  return (
    <div className="px-5">
      <div className="max-w-3xl mx-auto py-8">
        {role === "ADMIN" && (
          <ArticleAdminActions articleId={article.id} slug={article.slug} />
        )}
        <ArticleContent article={article} />
        <ArticleComment />
        <ArticleOthers />
      </div>
    </div>
  );
}
