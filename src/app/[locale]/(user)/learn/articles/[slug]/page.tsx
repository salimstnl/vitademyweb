import { authOptions } from "@/auth";
import ArticleAdminActions from "@/components/article-admin-actions";
import SafeHtml from "@/components/safe-html";
import { getArticleBySlugAction } from "@/lib/actions/articleActions";
import { getServerSession } from "next-auth";

export default async function ArticleDetail({
  params,
}: {
  params: { slug: string };
}) {
  // get user session
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  // get article by slug data
  const { slug } = params;
  const result = await getArticleBySlugAction(slug);

  if (!result.success || !result.article) {
    return <div>Article not found</div>;
  }

  const article = result.article;
  return (
    <div className="px-5">
      <div className="max-w-3xl mx-auto py-8">
        {role === "ADMIN" && (
          <ArticleAdminActions articleId={article.id} slug={article.slug} />
        )}
        <h1 className="text-3xl font-bold">{article.title}</h1>
        {article.thumbnail && (
          <img
            src={article.thumbnail}
            alt={article.title}
            className="my-6 rounded"
          />
        )}
        <SafeHtml html={article.content} />
      </div>
    </div>
  );
}
