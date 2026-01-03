import SafeHtml from "./safe-html";
import { ArticleWithRelations } from "@/lib/actions/articleActions";

type Props = {
  article: ArticleWithRelations;
};

export default function ArticleContent({ article }: Props) {
  function formatDate(date: Date | string) {
    const d = new Date(date);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">{article.title}</h1>

      <div className="text-sm text-muted-foreground">
        <h4>
          By {article.author.name}, {formatDate(article.createdAt)}
        </h4>
      </div>

      {article.thumbnail && (
        <img
          src={article.thumbnail}
          alt={article.title}
          className="my-6 rounded"
        />
      )}

      <SafeHtml html={article.content} />
    </div>
  );
}
