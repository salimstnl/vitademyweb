import React from "react";
import SectionHeader from "../ui/SectionHeader";
import Link from "next/link";
import { Button } from "../ui/Button";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useTranslations } from "next-intl";

export default function WhatWeGiveSection() {
  const t = useTranslations("WhatWeGiveSection");
  return (
    <div>
      <section>
        <SectionHeader>{t("headerText")}</SectionHeader>
        <div className="hidden md:grid md:grid-cols-3 md:gap-10">
          <div className="col-span-2 from-20% to-60% from-[#7efca0]/10 to-[#7efca0]/5 dark:from-[#5cff88]/20 dark:to-[#5cff88]/10 border-[#5cff88]/10 bg-gradient-to-b rounded-2xl border-2 p-10 grid grid-cols-2 gap-16">
            <div className="flex flex-col gap-10">
              <h2 className="text-3xl font-black">{t("detail-1")}</h2>
              <p className="text-justify">{t("detailDescription-1")}</p>
              <Link href="/learn/forum">
                <Button>{t("detailBtnText-1")}</Button>
              </Link>
            </div>
            <div>
              <Image
                src="/what-we-give/decentralized-forum.jpg"
                alt="Decentralized Forum"
                width={400}
                height={400}
                className="rounded-2xl"
              ></Image>
            </div>
          </div>
          <div className="row-span-2 from-20% to-60% from-[#c7106c]/10 to-[#c7106c]/5 dark:from-[#bf2a75]/20 dark:to-[#bf2a75]/10 border-[#bf2a75]/10 bg-gradient-to-b rounded-2xl border-2 p-10">
            <div className="flex flex-col gap-20">
              <div className="flex flex-col gap-5">
                <h2 className="text-3xl font-black">{t("detail-2")}</h2>
                <p className="text-justify">{t("detailDescription-2")}</p>
                <Link href="/event/workshops">
                  <Button>{t("detailBtnText-2")}</Button>
                </Link>
              </div>
              <div>
                <Image
                  src="/what-we-give/learning-module.jpg"
                  alt="Learning Module"
                  width={400}
                  height={400}
                  className="rounded-2xl"
                ></Image>
              </div>
            </div>
          </div>
          <div className="col-span-2 from-20% to-60% from-[#9f6cf0]/10 to-[#9f6cf0]/5 dark:from-[#7d5bb5]/20 dark:to-[#7d5bb5]/10 border-[#7d5bb5]/10 bg-gradient-to-b rounded-2xl border-2 p-10 grid grid-cols-2 gap-16">
            <div>
              <Image
                src="/what-we-give/vita-shop.jpg"
                alt="Vita Shop"
                width={400}
                height={400}
                className="rounded-2xl"
              ></Image>
            </div>
            <div className="flex flex-col gap-10">
              <h2 className="text-3xl font-black">{t("detail-3")}</h2>
              <p className="text-justify">{t("detailDescription-3")}</p>
              <Link href="/connect/our-products">
                <Button>{t("detailBtnText-3")}</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile What We Give */}
      <section className="grid grid-cols-1 gap-10 md:hidden">
        <div className="col-span-2 block md:hidden">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            className="rounded-2xl"
          >
            <SwiperSlide>
              <div className="h-[900px] from-[#7efca0]/10 to-[#7efca0]/5 dark:from-[#5cff88]/20 dark:to-[#5cff88]/10 border-[#5cff88]/10 bg-gradient-to-b rounded-2xl border-2 p-10">
                <div className="flex flex-col gap-10 h-full">
                  <Image
                    src="/free_modules.jpg"
                    alt="Free Modules"
                    width={400}
                    height={400}
                    className="rounded-2xl"
                  />
                  <h2 className="text-3xl font-black">{t("detail-1")}</h2>
                  <p>{t("detailDescription-1")}</p>
                  <Link href="/learn/modules">
                    <Button>{t("detailBtnText-1")}</Button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="h-[900px] from-[#c7106c]/10 to-[#c7106c]/5 dark:from-[#bf2a75]/20 dark:to-[#bf2a75]/10 border-[#bf2a75]/10 bg-gradient-to-b rounded-2xl border-2 p-10">
                <div className="flex flex-col gap-10 h-full">
                  <Image
                    src="/education_event.jpg"
                    alt="Education Event"
                    width={400}
                    height={400}
                    className="rounded-2xl"
                  />
                  <h2 className="text-3xl font-black">{t("detail-2")}</h2>
                  <p>{t("detailDescription-2")}</p>
                  <Link href="/event/workshops">
                    <Button>{t("detailBtnText-2")}</Button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="h-[900px] from-[#9f6cf0]/10 to-[#9f6cf0]/5 dark:from-[#7d5bb5]/20 dark:to-[#7d5bb5]/10 border-[#7d5bb5]/10 bg-gradient-to-b rounded-2xl border-2 p-10">
                <div className="flex flex-col gap-10 h-full">
                  <Image
                    src="/one_on_one.jpg"
                    alt="One on One Consultation"
                    width={400}
                    height={400}
                    className="rounded-2xl"
                  />
                  <h2 className="text-3xl font-black">{t("detail-3")}</h2>
                  <p className="text-justify">{t("detailDescription-3")}</p>
                  <Link href="">
                    <Button>{t("detailBtnText-3")}</Button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </div>
  );
}
