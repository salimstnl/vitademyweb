import React from "react";
import CategoryBadge from "../ui/CategoryBadge";
import MasterclassCard from "../masterclass-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useTranslations } from "next-intl";

export default function MasterclassSection() {
  const t = useTranslations("MasterclassSection");
  const masterclassList = t.raw("masterclasses");

  return (
    <div>
      {/* Masterclass Desktop */}
      <section>
        <div className="flex flex-col gap-10">
          <div className="hidden md:grid md:grid-cols-3 md:gap-10">
            <div className="flex flex-col gap-5">
              <CategoryBadge>Masterclasses</CategoryBadge>
              <h1 className="text-6xl font-black">{t("headerText")}</h1>
            </div>

            {masterclassList.map((item: any, i: number) => (
              <MasterclassCard key={i} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Masterclass */}
      <section className="grid grid-cols-1 gap-10 md:hidden">
        <h1 className="text-4xl text-center font-black col-span-2">
          {t("mobileHeaderText")}
        </h1>
        <div className="col-span-2 block md:hidden">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            className="rounded-2xl"
          >
            {masterclassList.map((item: any, i: number) => (
              <SwiperSlide key={i}>
                <MasterclassCard {...item} isMobile />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
}
