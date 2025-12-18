// "use client";
// import { useSelectedLayoutSegment } from "next/navigation";

// // async function getModule(slug) {
// //   const res =
// // }

// export default function ModulesDetail({ slug }: { slug: string }) {
//   const segment = useSelectedLayoutSegment();
//   return (
//     <div>
//       <h1>{slug}</h1>
//     </div>
//   );
// }

import MaintenancePage from "@/components/maintenance-page";
import React from "react";

export default function page() {
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true") {
    return <MaintenancePage />;
  }
  return <div>page</div>;
}
