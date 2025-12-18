"use client";

import { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";

export function ImageUploader({
  onFileSelected,
}: {
  onFileSelected: (file: File | null) => void;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const removeImage = () => {
    setPreviewUrl(null);
    setFileName("");
    onFileSelected(null);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Image preview */}
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Thumbnail preview"
          className="w-32 h-32 object-cover rounded border"
        />
      )}

      {/* File name */}
      {fileName && (
        <p className="text-sm text-gray-600">Selected: {fileName}</p>
      )}

      {/* Remove Button */}
      {previewUrl && (
        <button
          type="button"
          onClick={removeImage}
          className="px-3 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600"
        >
          Remove Image
        </button>
      )}

      <UploadButton
        endpoint="imageUploader"
        onBeforeUploadBegin={(files) => {
          const file = files[0] || null;

          onFileSelected(file);

          if (file) {
            setFileName(file.name);
            setPreviewUrl(URL.createObjectURL(file));
          } else {
            setFileName("");
            setPreviewUrl(null);
          }

          return []; // cancel upload
        }}
        onClientUploadComplete={() => {}}
        onUploadError={() => {}}
      />
    </div>
  );
}
