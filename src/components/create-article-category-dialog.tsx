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
import { createArticleCategoryAction } from "@/lib/actions/articleActions";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CreateArticleCategoryDialog({
  open,
  onOpenChange,
}: Props) {
  const [pending, setPending] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setPending(true);
    const result = await createArticleCategoryAction({ categoryName });
    setPending(false);

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Category successfully saved!");
    setCategoryName("");

    setTimeout(() => {
      window.location.reload();
    }, 1200);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <Input
              name="categoryName"
              placeholder="Category name"
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

          <DialogFooter>
            {!pending ? (
              <Button type="submit">Save</Button>
            ) : (
              <Button disabled>Saving...</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
