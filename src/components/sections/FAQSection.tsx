import React from "react";
import FAQAccordion from "../faq-accordion";
import { useTranslations } from "next-intl";

export default function FAQSection() {
  const t = useTranslations("FAQSection");
  return (
    <section id="faq">
      <div className="from-[#9f6cf0]/10 to-[#9f6cf0]/5 dark:from-[#7d5bb5]/20 dark:to-[#7d5bb5]/10 border-[#7d5bb5]/10 bg-gradient-to-b rounded-xl md:rounded-full py-15 px-5 md:p-20">
        <h1 className="text-4xl font-bold text-center mb-10">
          {t("headerText")}
        </h1>
        <div className="flex flex-col items-center">
          <FAQAccordion></FAQAccordion>
        </div>
      </div>
    </section>
  );
}
