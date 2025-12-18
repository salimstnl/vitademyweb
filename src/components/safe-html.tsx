"use client";

import DOMPurify from "dompurify";

export default function SafeHtml({ html }: { html: string }) {
  return (
    <div
      className="prose prose-lg dark:prose-invert max-w-none [&>p]:my-3 [&>h1]:mt-12 [&>h1]:mb-6 [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:mt-8  [&>h3]:mb-3 [&>ul]:my-6 [&>ol]:my-6 [&>li]:my-2"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(html),
      }}
    />
  );
}
