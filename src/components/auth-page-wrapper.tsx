"use client";

import React from "react";

export default function AuthPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:p-20 bg-[#f8f9fc] dark:bg-[#1a1427] min-h-screen flex items-center justify-center">
      <section
        id="main-section"
        className="relative z-10 rounded-4xl w-full max-w-6xl"
      >
        {children}
      </section>
    </div>
  );
}
