import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  ArticleWithRelations,
  getArticleAction,
} from "@/lib/actions/articleActions";
import Link from "next/link";
import ArticleAdminActions from "./article-admin-actions";

export default function ArticleTable() {
  const [articles, setArticles] = useState<ArticleWithRelations[] | null>(null);

  useEffect(() => {
    async function load() {
      const result = await getArticleAction();
      if (result.success) {
        setArticles(result.articles ?? []);
      }
    }
    load();
  }, []);

  return (
    <div>
      <Table>
        <TableCaption>A list of your articles.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Thumbnail</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Published</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {articles?.length ? (
            articles.map((a) => (
              <TableRow key={a.id}>
                <TableCell>
                  {a.thumbnail && (
                    <img
                      src={a.thumbnail}
                      alt={a.title}
                      width={100}
                      height={100}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Link
                    href={`/learn/articles/${a.slug}`}
                    className="hover:underline"
                  >
                    {a.title}
                  </Link>
                </TableCell>
                <TableCell>{a.shortDesc}</TableCell>
                <TableCell>{a.articleCategory?.name}</TableCell>
                <TableCell>
                  {new Date(a.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell>{a.author?.name}</TableCell>
                <TableCell>{a.published ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <ArticleAdminActions articleId={a.id} slug={a.slug} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                No articles found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
