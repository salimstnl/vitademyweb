"use client";

import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Button } from "./ui/Button";
import CreateArticleCategoryDialog from "./create-article-category-dialog";
import { ArticleCategory } from "@prisma/client";

import { IoIosAdd } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import { ScrollArea } from "./ui/scroll-area";
import DeleteArticleCategoryDialog from "./delete-article-category-dialog";
import {
  createArticleAction,
  getArticleCategoriesAction,
} from "@/lib/actions/articleActions";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CreateArticleDialogClient({
  open,
  onOpenChange,
}: Props) {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [dialogCategoryOpen, setDialogCategoryOpen] = useState(false);
  const [isDeleteArticleCategoryOpen, setDeleteArticleCategoryOpen] =
    useState(false);

  const [creating, setCreating] = useState(false);
  const [categories, setCategories] = useState<ArticleCategory[] | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const selectedCategory = categories?.find((c) => c.id === selectedCategoryId);

  // Get article category
  useEffect(() => {
    async function load() {
      const result = await getArticleCategoriesAction();
      if (result.success) {
        setCategories(result.categories ?? []);
      }
    }
    load();
  }, []);

  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setCreating(true);
    const result = await createArticleAction({
      categoryId,
      title,
      shortDesc,
      content,
    });
    setCreating(false);

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Article successfully saved!");
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  }

  return (
    <div>
      <CreateArticleCategoryDialog
        open={dialogCategoryOpen}
        onOpenChange={setDialogCategoryOpen}
      />
      <DeleteArticleCategoryDialog
        open={isDeleteArticleCategoryOpen}
        onOpenChange={setDeleteArticleCategoryOpen}
        category={selectedCategory}
      />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="min-w-3/4 min-h-3/4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between"
          >
            <DialogHeader>
              <DialogTitle>Create Article</DialogTitle>
              <DialogDescription>
                Time to create some articles
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <div className="grid gap-5 py-5">
                <div className="grid gap-3">
                  <Label htmlFor="category">Category</Label>
                  <div className="flex gap-2">
                    <Select
                      onValueChange={(value) => setSelectedCategoryId(value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Category</SelectLabel>
                          {categories
                            ? categories.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))
                            : null}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      className="bg-blue-500 text-white px-5 py-3 rounded border-0"
                      onClick={() => setDialogCategoryOpen(true)}
                    >
                      <IoIosAdd />
                    </Button>
                    <Button
                      type="button"
                      className="bg-red-500 text-white px-5 py-3 rounded border-0"
                      onClick={() => setDeleteArticleCategoryOpen(true)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    name="title"
                    placeholder=""
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="shortDesc">Short Description</Label>
                  <Input
                    name="shortDesc"
                    placeholder=""
                    onChange={(e) => setShortDesc(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="thumbnail">Upload Thumbnail</Label>
                  <Input
                    name="thumbnail"
                    ref={inputFileRef}
                    type="file"
                    accept="image/jpeg, image/png, image/webp"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="content">Content</Label>
                </div>
              </div>
            </ScrollArea>
            {!creating ? (
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save</Button>
              </DialogFooter>
            ) : (
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" disabled>
                    Cancel
                  </Button>
                </DialogClose>
                <Button disabled>Saving...</Button>
              </DialogFooter>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
