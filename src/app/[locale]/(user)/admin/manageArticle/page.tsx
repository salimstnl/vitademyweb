"use client";

import ArticleTable from "@/components/article-table";
import { Button } from "@/components/ui/Button";

export default function ManageArticle() {
  return (
    <div className="p-10 flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Articles</h1>
        <Button
          className="bg-blue-500 text-white px-5 py-3 rounded border-0"
          onClick={() => (window.location.href = "/admin/manageArticle/create")}
        >
          Add New Article
        </Button>
      </div>
      <ArticleTable></ArticleTable>
    </div>
  );
}
