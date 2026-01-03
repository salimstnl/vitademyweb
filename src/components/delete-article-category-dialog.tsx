"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/Button";
import { useState } from "react";
import { ArticleCategory } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteArticleCategoryAction } from "@/lib/actions/articleActions";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: ArticleCategory;
};

export default function DeleteArticleCategoryDialog({
  open,
  onOpenChange,
  category,
}: Props) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  async function handleDelete() {
    const articleCategoryId = category?.id;
    const categoryName = category?.name;

    if (!articleCategoryId) {
      toast.error(
        "Category ID undefined! Please refresh this page, the category might already be deleted!"
      );
      return;
    }

    if (!categoryName) {
      toast.error(
        "Category name undefined! Please refresh this page, the category might already be deleted!"
      );
      return;
    }

    // compare category name with delete confirmation
    if (deleteConfirmation != categoryName) {
      toast.error(
        "Delete confirmation incorrect. Please input " + categoryName + "!"
      );
      return;
    }

    setDeleting(true);
    const res = await deleteArticleCategoryAction(articleCategoryId);
    if (res?.success) {
      toast.success("Successfully deleted article category");
      router.push("/admin/manageArticle");
    } else {
      toast.error(res?.error ?? "Failed to delete article category");
    }
    setDeleting(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {category ? (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category: {category.name}</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <Input
              name="deleteConfirmation"
              placeholder={`Type ${category.name} to confirm your deletion`}
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
            />
          </div>

          <DialogFooter>
            {!deleting ? (
              <Button onClick={handleDelete}>Delete</Button>
            ) : (
              <Button disabled>Deleting...</Button>
            )}
          </DialogFooter>
        </DialogContent>
      ) : (
        <DialogContent>
          <h1 className="text-center">
            Please select the Category you want to delete
          </h1>
        </DialogContent>
      )}
    </Dialog>
  );
}
