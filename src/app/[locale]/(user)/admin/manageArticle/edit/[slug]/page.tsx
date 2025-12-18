import EditArticleForm from "@/components/edit-article-form";
import { getArticleBySlugAction } from "@/lib/actions/articleActions";

export default async function EditArticlePage({ params }: any) {
  const result = await getArticleBySlugAction(params.slug);

  if (!result.success || !result.article) {
    return <div>Article not found</div>;
  }

  return <EditArticleForm article={result.article} />;
}
