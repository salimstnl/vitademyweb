"use client";
import { useSelectedLayoutSegment } from "next/navigation";

// async function getModule(slug) {
//   const res =
// }

export default function ModulesDetail({ slug }: { slug: string }) {
  const segment = useSelectedLayoutSegment();
  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
}
