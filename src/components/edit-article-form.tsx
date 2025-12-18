"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import {
  editArticleAction,
  getArticleCategoriesAction,
} from "@/lib/actions/articleActions";
import { ImageUploader } from "@/components/ui/image-uploader";
import Tiptap from "@/components/wysiwyg/tiptap";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import Link from "next/link";
import { IoIosAdd } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import CreateArticleCategoryDialog from "./create-article-category-dialog";
import DeleteArticleCategoryDialog from "./delete-article-category-dialog";
import { useRouter } from "next/navigation";

export default function EditArticleForm({ article }: { article: any }) {
  const [categories, setCategories] = useState<any[]>([]);
  const [pending, setPending] = useState(false);

  const [openCreateCategory, setOpenCreateCategory] = useState(false);
  const [openDeleteCategory, setOpenDeleteCategory] = useState(false);

  // 🧠 form state (prefilled)
  const [categoryId, setCategoryId] = useState(article.articleCategoryId);
  const [title, setTitle] = useState(article.title);
  const [shortDesc, setShortDesc] = useState(article.shortDesc ?? "");
  const [content, setContent] = useState(article.content);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [existingThumbnail, setExistingThumbnail] = useState(article.thumbnail);

  const { startUpload } = useUploadThing("imageUploader");
  const router = useRouter();

  // load categories
  useEffect(() => {
    getArticleCategoriesAction().then((res) => {
      if (res.success) setCategories(res.categories);
    });
  }, []);
  const selectedCategory = categories?.find((c) => c.id === categoryId);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);

    let thumbnailUrl = existingThumbnail;

    // upload new thumbnail if changed
    if (selectedFile) {
      const upload = await startUpload([selectedFile]);
      thumbnailUrl = upload?.[0]?.url ?? existingThumbnail;
    }

    const result = await editArticleAction({
      id: article.id,
      title,
      shortDesc,
      content,
      categoryId,
      thumbnailUrl,
    });

    setPending(false);

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Article updated!");
    router.push("/admin/manageArticle");
  }

  return (
    <div className="p-10">
      <CreateArticleCategoryDialog
        open={openCreateCategory}
        onOpenChange={setOpenCreateCategory}
      />
      <DeleteArticleCategoryDialog
        open={openDeleteCategory}
        onOpenChange={setOpenDeleteCategory}
        category={selectedCategory}
      />

      <form onSubmit={handleSubmit} className="flex flex-col justify-between">
        <div className="flex flex-col gap-5">
          <div>
            <h1 className="text-3xl font-bold">Edit Article</h1>
            <h3 className="text-neutral-400">Update your existing article</h3>
          </div>

          <div className="grid gap-5 py-5">
            {/* Category */}
            <div className="grid gap-3">
              <Label htmlFor="category">Category</Label>
              <div className="flex gap-2">
                <input type="hidden" value={categoryId} />
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  type="button"
                  className="bg-blue-500 text-white px-5 py-3 rounded border-0"
                  onClick={() => setOpenCreateCategory(true)}
                >
                  <IoIosAdd />
                </Button>

                <Button
                  type="button"
                  className="bg-red-500 text-white px-5 py-3 rounded border-0"
                  onClick={() => setOpenDeleteCategory(true)}
                >
                  <FaTrash />
                </Button>
              </div>
            </div>

            {/* Title */}
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            {/* Short Desc */}
            <div className="grid gap-3">
              <Label htmlFor="shortDesc">Short Description</Label>
              <Input
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
              />
            </div>

            {/* Thumbnail */}
            <div className="flex flex-col items-start gap-3">
              <Label>Upload Thumbnail</Label>

              {existingThumbnail && (
                <img
                  src={existingThumbnail}
                  className="w-48 rounded border"
                  alt="Current thumbnail"
                />
              )}

              <ImageUploader onFileSelected={setSelectedFile} />
            </div>

            {/* Content */}
            <div className="grid gap-3">
              <Label htmlFor="content">Content</Label>
              <Tiptap content={content} onChange={setContent} />
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={pending}>
            {pending ? "Saving..." : "Save Changes"}
          </Button>
          <Link href="/admin/manageArticle">
            <Button>Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
