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
import { ArticleCategory } from "@/generated/prisma/client";

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
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    setDeleting(true);

    const res = await fetch("/api/article/deleteArticleCategory", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    setDeleting(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong.");
    } else {
      setSuccess("Article category successfully deleted!");
    }

    window.location.reload();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {category ? (
          <form onSubmit={handleDelete}>
            <DialogHeader>
              <DialogTitle>Delete Category: {category.name}</DialogTitle>
            </DialogHeader>

            <div className="py-4">
              <Input type="hidden" name="categoryId" value={category.id} />
              <Input type="hidden" name="categoryName" value={category.name} />
              <Input
                name="deleteConfirmation"
                placeholder={`Type ${category.name} to confirm your deletion`}
              />
            </div>

            <DialogFooter>
              {!deleting ? (
                <Button type="submit">Delete</Button>
              ) : (
                <Button disabled>Deleting...</Button>
              )}
            </DialogFooter>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
          </form>
        ) : (
          <h1 className="text-center">
            Please select the Category you want to delete
          </h1>
        )}
      </DialogContent>
    </Dialog>
  );
}
