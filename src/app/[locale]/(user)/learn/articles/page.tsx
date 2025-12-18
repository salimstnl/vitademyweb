"use client";

import ArticleListCard from "@/components/article-list-card";
import { Button } from "@/components/ui/Button";
import { ArticleCategory } from "@/generated/prisma/client";
import { getArticleCategoriesAction } from "@/lib/actions/articleActions";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

export default function page() {
  const [categories, setCategories] = useState<ArticleCategory[] | null>(null);
  useEffect(() => {
    async function load() {
      const result = await getArticleCategoriesAction();
      if (result.success) {
        setCategories(result.categories);
      }
      setSelectedCategory("");
    }
    load();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const t = useTranslations("Article");
  return (
    <div className=" p-10 md:py-20 md:px-30">
      <div className="flex flex-col gap-10">
        <h1 className="text-5xl font-bold">{t("headerText")}</h1>
        <p className="text-justify leading-relaxed md:text-lg">
          {t("headerSubText")}
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 items-center w-full max-w-md">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-full md:rounded-none md:rounded-l-full border border-gray-300 md:border-r-0 focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-3/4"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded-full md:rounded-none md:rounded-r-full border border-gray-300 md:border-l-0  hover:bg-gray-800 dark:hover:bg-gray-300 transition w-full md:w-1/2"
          >
            Subscribe
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
          {/* View All */}
          <Button
            variant="ghost"
            onClick={() => setSelectedCategory("")}
            className={`
      rounded-full px-4 py-2 text-sm font-medium transition-all
      ${
        selectedCategory === ""
          ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-sm border"
          : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 border"
      }
    `}
          >
            View All
          </Button>

          {categories &&
            categories.length > 0 &&
            categories.map((category) => {
              const isActive = selectedCategory === category.id;

              return (
                <Button
                  key={category.id}
                  variant="ghost"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
            rounded-full px-4 py-2 text-sm font-medium transition-all
            ${
              isActive
                ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-sm border"
                : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 border"
            }
          `}
                >
                  {category.name}
                </Button>
              );
            })}
        </div>
        <ArticleListCard selectedCategory={selectedCategory} />
      </div>
    </div>
  );
}
