"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const toggleLocale = () => {
    // toggle between English and Indonesian
    const newLocale = currentLocale === "en" ? "id" : "en";

    // Replace the locale segment in the path
    const segments = pathname.split("/");
    segments[1] = newLocale; // your locale always sits right after '/'
    const newPath = segments.join("/") || "/";

    router.replace(newPath);
  };

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-2 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-md px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
    >
      <Globe size={16} />
      {currentLocale === "en" ? "EN" : "ID"}
    </button>
  );
}
