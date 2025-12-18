"use client";

import { useRouter } from "next/navigation";
import { deleteArticleAction } from "@/lib/actions/articleActions";
import { toast } from "sonner";

export default function ArticleAdminActions({
  articleId,
  slug,
}: {
  articleId: string;
  slug: string;
}) {
  const router = useRouter();

  async function handleDelete() {
    const ok = confirm("Are you sure you want to delete this article?");
    if (!ok) return;

    const res = await deleteArticleAction(articleId);

    if (res?.success) {
      toast.success("Successfully deleted article");
      router.push("/admin/manageArticle");
    } else {
      toast.error(res?.error ?? "Failed to delete article");
    }
  }

  return (
    <div className="flex gap-3 my-4">
      <button
        onClick={() => router.push(`/admin/manageArticle/edit/${slug}`)}
        className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        Edit
      </button>

      <button
        onClick={handleDelete}
        className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
}
