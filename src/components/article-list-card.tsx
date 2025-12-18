import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import {
  ArticleWithRelations,
  getArticleAction,
} from "@/lib/actions/articleActions";

export default function ArticleListCard({
  selectedCategory,
}: {
  selectedCategory: string | null;
}) {
  const [articles, setArticles] = useState<ArticleWithRelations[] | null>(null);
  useEffect(() => {
    async function load() {
      const result = await getArticleAction(selectedCategory ?? undefined);
      if (result.success) {
        setArticles(result.articles ?? []);
      }
    }

    load();
  }, [selectedCategory]);

  // Helper function to format date
  function formatDate(date: Date | string) {
    const d = new Date(date);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  if (!articles || articles.length === 0) {
    return <p>Article Not Found</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {articles.map((article) => (
        <Card className="overflow-hidden rounded-lg shadow-md">
          <CardHeader className="relative p-0 m-0 border-0">
            <img
              alt={article.slug}
              src={article.thumbnail ?? "/placeholder.png"}
              width={400}
              height={250}
              className="object-cover w-full h-72"
            />

            {/* Overlay */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/70 to-transparent text-white p-4 flex justify-between text-sm">
              <div>
                <p className="font-semibold">{article.author.name}</p>
                <p className="text-xs opacity-80">
                  {formatDate(article.createdAt)}
                </p>
              </div>
              <span className="bg-white/20 text-white text-xs px-2 py-2 rounded-full">
                {article.articleCategory.name}
              </span>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-5">
              <Link
                href={`/learn/articles/${article.slug}`}
                className="text-3xl font-semibold transition-colors duration-300 ease-in-out hover:underline underline-offset-4"
              >
                {article.title}
              </Link>
              <p className="text-xl text-neutral-500 dark:text-neutral-400">
                {article.shortDesc}
              </p>
            </div>
          </CardContent>

          <CardFooter>
            <Link
              href={`/learn/articles/${article.slug}`}
              className="font-bold hover:underline underline-offset-4 flex items-end"
            >
              Read Post ➚
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
