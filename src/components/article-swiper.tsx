import {
  ArticleWithRelations,
  getArticleAction,
} from "@/lib/actions/articleActions";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ArticleSwiper() {
  const [articles, setArticles] = useState<ArticleWithRelations[] | null>(null);

  useEffect(() => {
    async function load() {
      const result = await getArticleAction();
      if (result.success) {
        setArticles(result.articles ?? []);
      }
    }
    load();
  }, []);

  // Helper function to format date
  function formatDate(date: Date | string) {
    const d = new Date(date);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  if (!articles || articles.length === 0) {
    return <p>Article Not Found</p>; // You can replace this with a styled design later
  }

  return (
    <Swiper
      className="cursor-grab active:cursor-grabbing"
      modules={[Scrollbar]}
      spaceBetween={20}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {articles.map((article, index) => (
        <SwiperSlide key={index}>
          <Link href={`/learn/articles/${article.slug}`} className="group">
            <div className="flex flex-col rounded-2xl shadow-md border h-96 overflow-hidden">
              {/* Image container with fixed height */}
              <div className="relative w-full h-56 overflow-hidden rounded-t-2xl">
                <img
                  src={article.thumbnail ?? "/placeholder.png"}
                  alt="Learning Module Thumbnail"
                  className="w-full h-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col p-5">
                <h1 className="text-2xl font-bold group-hover:underline">
                  {article.title}
                </h1>
                <div className="mt-3">
                  <p className="italic text-sm">
                    {formatDate(article.createdAt)}
                  </p>
                  <p className="capitalize text-stone-400 text-sm">
                    {article.author.name}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
