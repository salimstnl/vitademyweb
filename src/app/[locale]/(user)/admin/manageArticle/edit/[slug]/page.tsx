import EditArticleForm from "@/components/edit-article-form";
import { getArticleBySlugAction } from "@/lib/actions/articleActions";

export default async function EditArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  // get article by slug data
  const { slug } = params;
  const result = await getArticleBySlugAction(slug);

  if (!result.success || !result.article) {
    return <div>Article not found</div>;
  }

  return <EditArticleForm article={result.article} />;
}
