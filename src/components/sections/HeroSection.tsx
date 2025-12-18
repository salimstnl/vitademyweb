import React, { useState } from "react";
import { ReactTyped } from "react-typed";
import { Button } from "../ui/Button";
import ContactDialog from "../contact-dialog";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("HeroSection");
  const [isContactOpen, setContactOpen] = useState(false);

  return (
    <div>
      <ContactDialog open={isContactOpen} onOpenChange={setContactOpen} />
      <section className="flex flex-col gap-20">
        <div className="flex flex-col gap-3 items-center">
          <ReactTyped
            className="flex justify-center items-center text-xl text-[#32078E] dark:text-[#8C58FF]"
            strings={["Vitademy.", "ヴィタデミー.", "비타데미."]}
            typeSpeed={40}
            backSpeed={50}
            loop
          />
          <p className="text-center font-black text-4xl">
            {t("welcomeMessage")}
          </p>
          <p className="text-center text-[#7a7a7a] dark:text-[#8C8C8C]">
            {t("slogan")}
          </p>
          <Button
            className="w-50 mt-5"
            size="lg"
            onClick={() => setContactOpen(true)}
          >
            {t("welcomeBtn")}
          </Button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          <Link href="/learn/modules">
            <div className="lg:flex items-center gap-3.5 lg:flex-row lg:text-start text-center flex flex-col [&_.body]:text-center group">
              <div className="header relative grid aspect-square size-[5em] shrink-0 place-items-center rounded-2xl border shadow-svg-button-link transition-all duration-200 group-hover:shadow-svg-button-link-hover group-hover:transition-all group-hover:duration-200 group-focus:shadow-none group-focus:transition-all group-focus:duration-200">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-300 ease-in-out transform origin-center group-hover:scale-110 group-hover:rotate-[10deg] group-hover:stroke-[#A855F7] dark:group-hover:stroke-[#e3cff8]"
                >
                  <path
                    d="M3 5H21V19H3V5Z"
                    stroke="currentColor"
                    className="text-[#6A0DAD] dark:text-[#D8B4FE] group-hover:text-[#A855F7] dark:group-hover:text-[#e3cff8]"
                    strokeWidth="2"
                  />
                  <path
                    d="M7 8H17M7 12H12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <p className="font-black text-md text-[#6A0DAD] dark:text-[#D8B4FE] transition-all group-hover:text-[#A855F7] dark:group-hover:text-[#e3cff8]">
                  {t("badges-1")}
                </p>
                <p>{t("badgesDescription-1")}</p>
              </div>
            </div>
          </Link>
          <Link href="/event/workshops">
            <div className="lg:flex items-center gap-3.5 lg:flex-row lg:text-start text-center flex flex-col [&_.body]:text-center group">
              <div className="header relative grid aspect-square size-[5em] shrink-0 place-items-center rounded-2xl border shadow-svg-button-link transition-all duration-200 group-hover:shadow-svg-button-link-hover group-hover:transition-all group-hover:duration-200 group-focus:shadow-none group-focus:transition-all group-focus:duration-200">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-300 ease-in-out transform origin-center group-hover:scale-110 group-hover:rotate-[2deg] group-hover:stroke-[#FBBF24] dark:group-hover:stroke-[#fcd34d]"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="#F59E0B"
                    strokeWidth="2"
                    className="group-hover:stroke-[#FBBF24] dark:group-hover:stroke-[#fcd34d]"
                  />
                  <path
                    d="M3 12h18"
                    stroke="#F59E0B"
                    strokeWidth="1.5"
                    className="group-hover:stroke-[#FBBF24] dark:group-hover:stroke-[#fcd34d]"
                  />
                  <path
                    d="M6 9c1.5 3 10.5 3 12 0"
                    stroke="#F59E0B"
                    strokeWidth="1.5"
                    fill="none"
                    className="group-hover:stroke-[#FBBF24] dark:group-hover:stroke-[#fcd34d]"
                  />
                  <path
                    d="M12 5l5 2.5-5 2.5-5-2.5L12 5z"
                    stroke="#F59E0B"
                    strokeWidth="1.5"
                    fill="none"
                    className="group-hover:stroke-[#FBBF24] dark:group-hover:stroke-[#fcd34d]"
                  />
                  <path
                    d="M17 7.5v2"
                    stroke="#F59E0B"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="group-hover:stroke-[#FBBF24] dark:group-hover:stroke-[#fcd34d]"
                  />
                </svg>
              </div>
              <div>
                <p className="font-black text-md text-[#F59E0B] transition-all group-hover:text-[#FBBF24] dark:group-hover:text-[#FCD34D]">
                  {t("badges-2")}
                </p>
                <p>{t("badgesDescription-2")}</p>
              </div>
            </div>
          </Link>
          <Link href="/event/seminars">
            <div className="lg:flex items-center gap-3.5 lg:flex-row lg:text-start text-center flex flex-col [&_.body]:text-center group">
              <div className="header relative grid aspect-square size-[5em] shrink-0 place-items-center rounded-2xl border shadow-svg-button-link transition-all duration-200 group-hover:shadow-svg-button-link-hover group-hover:transition-all group-hover:duration-200 group-focus:shadow-none group-focus:transition-all group-focus:duration-200">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-300 ease-in-out transform origin-center group-hover:scale-110 group-hover:rotate-[10deg] group-hover:stroke-[#10B981] dark:group-hover:stroke-[#6EE7B7]"
                >
                  <path
                    d="M8 12L12 4L16 12"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="group-hover:stroke-[#10B981] dark:group-hover:stroke-[#6EE7B7]"
                  />
                  <circle
                    cx="12"
                    cy="16"
                    r="2"
                    fill="#10B981"
                    className="group-hover:stroke-[#10B981] dark:group-hover:stroke-[#6EE7B7]"
                  />
                </svg>
              </div>
              <div>
                <p className="font-black text-md text-[#10B981] transition-all group-hover:text-[#34D399] dark:group-hover:text-[#6EE7B7]">
                  {t("badges-3")}
                </p>
                <p>{t("badgesDescription-3")}</p>
              </div>
            </div>
          </Link>
          <Link href="/event/workshops">
            <div className="lg:flex items-center gap-3.5 lg:flex-row lg:text-start text-center flex flex-col [&_.body]:text-center group">
              <div className="header relative grid aspect-square size-[5em] shrink-0 place-items-center rounded-2xl border shadow-svg-button-link transition-all duration-200 group-hover:shadow-svg-button-link-hover group-hover:transition-all group-hover:duration-200 group-focus:shadow-none group-focus:transition-all group-focus:duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  width="40"
                  height="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 ease-in-out transform origin-center group-hover:scale-110 group-hover:rotate-[10deg] group-hover:stroke-[#2563EB] dark:group-hover:stroke-[#DBEAFE]"
                >
                  <rect
                    x="4"
                    y="10"
                    width="56"
                    height="36"
                    rx="4"
                    ry="4"
                    fill="#DBEAFE"
                  />
                  <path d="M10 16h44M10 24h44M10 32h28" stroke="#2563EB" />
                  <circle cx="52" cy="32" r="3" fill="#2563EB" />
                  <path d="M10 40h44" stroke="#2563EB" />
                  <circle cx="20" cy="52" r="4" fill="#2563EB" />
                  <circle cx="32" cy="52" r="4" fill="#2563EB" />
                  <circle cx="44" cy="52" r="4" fill="#2563EB" />
                </svg>
              </div>
              <div>
                <p className="font-black text-md text-[#2563EB] dark:text-[#93C5FD] transition-all group-hover:text-[#3B82F6] dark:group-hover:text-[#DBEAFE]">
                  {t("badges-4")}
                </p>
                <p>{t("badgesDescription-4")}</p>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
