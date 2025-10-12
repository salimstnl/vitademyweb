import React from "react";
import SectionHeader from "../ui/SectionHeader";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function WhatWeDoSection() {
  const t = useTranslations("WhatWeDoSection");
  return (
    <div>
      <section id="what-we-do">
        <SectionHeader>{t("headerText")}</SectionHeader>
        <div className="flex flex-col gap-20 md:gap-40">
          <div className="grid md:grid-cols-2">
            <div className="flex flex-col gap-10">
              <h1 className="font-bold text-3xl text-center md:text-start md:text-5xl leading-relaxed">
                {t("detail-1")}
              </h1>
              <div className="flex justify-center md:hidden">
                <Image
                  src="/omnidirectional_learning.jpg"
                  alt="Omnidirectional Learning"
                  width={400}
                  height={200}
                  className="rounded-2xl ease-in-out duration-200 group-hover:scale-110"
                ></Image>
              </div>
              <p className="leading-loose text-lg md:text-xl text-justify">
                {t("detailDescription-1")}
              </p>
            </div>
            <div className="hidden md:flex justify-center">
              <Image
                src="/omnidirectional_learning.jpg"
                alt="Omnidirectional Learning"
                width={400}
                height={200}
                className="rounded-2xl ease-in-out duration-200 group-hover:scale-110"
              ></Image>
            </div>
          </div>
          <div className="grid md:grid-cols-2">
            <div className="hidden md:flex items-center">
              <Image
                src="/what-we-do/connect.jpg"
                alt="Learning Module Thumbnail"
                width={600}
                height={600}
                className="rounded-2xl ease-in-out duration-200 group-hover:scale-110"
              ></Image>
            </div>
            <div className="flex flex-col gap-10">
              <h1 className="font-bold text-3xl text-center md:text-start md:text-5xl leading-relaxed">
                {t("detail-2")}
              </h1>
              <div className="md:hidden flex items-center">
                <Image
                  src="/what-we-do/connect.jpg"
                  alt="Learning Module Thumbnail"
                  width={600}
                  height={600}
                  className="rounded-2xl ease-in-out duration-200 group-hover:scale-110"
                ></Image>
              </div>
              <p className="leading-loose text-lg md:text-xl text-justify">
                {t("detailDescription-2")}
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2">
            <div className="flex flex-col gap-10">
              <h1 className="font-bold text-3xl text-center md:text-start md:text-5xl leading-relaxed">
                {t("detail-3")}
              </h1>
              <div className="md:hidden flex justify-center">
                <Image
                  src="/what-we-do/find-your-style.jpg"
                  alt="Learning Module Thumbnail"
                  width={600}
                  height={200}
                  className="rounded-2xl ease-in-out duration-200 group-hover:scale-110"
                ></Image>
              </div>
              <div className="leading-loose flex flex-col gap-5 text-lg md:text-xl text-justify">
                <div>{t("detailDescription-3")}</div>
                <div className="underline underline-offset-8"> Access:</div>
                <div>
                  <p>✅ {t("subDetail-3-1")}</p>
                  <p>✅ {t("subDetail-3-2")}</p>
                  <p>✅ {t("subDetail-3-3")}</p>
                  <p>✅ {t("subDetail-3-4")}</p>
                </div>
                <div>{t("subDetail-3-5")}</div>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <Image
                src="/what-we-do/find-your-style.jpg"
                alt="Learning Module Thumbnail"
                width={600}
                height={200}
                className="rounded-2xl ease-in-out duration-200 group-hover:scale-110"
              ></Image>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
