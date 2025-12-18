import Link from "next/link";
import React from "react";
import { Button } from "../ui/Button";
import { useTranslations } from "next-intl";
import ArticleSwiper from "../article-swiper";

export default function BrowseArticlesSection() {
  const t = useTranslations("BrowseArticlesSection");
  return (
    <div>
      <section>
        <div className="flex-grow border-t-4 border-gray-300 dark:border-gray-600 mb-12" />
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-extrabold">{t("title")}</h1>
          <p className="text-lg mb-5">{t("subTitle")}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 italic mt-2">
            Swipe me →
          </p>
          <div className="w-full">
            <ArticleSwiper />
          </div>
          <div className="flex justify-center">
            <Link href="/learn/articles">
              <Button>{t("headerBtnText")}</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
