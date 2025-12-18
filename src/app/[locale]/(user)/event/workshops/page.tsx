import MaintenancePage from "@/components/maintenance-page";
import React from "react";

export default function page() {
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true") {
    return <MaintenancePage />;
  }
  return <div>page</div>;
}
