"use client";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/Accordion";
import { faqs } from "@/data/faqs";

export default function FAQAccordion() {
  const t = useTranslations();

  return (
    <Accordion
      type="single"
      collapsible
      className="mx-auto w-full lg:max-w-3xl p-10"
    >
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id}>
          <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
            <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
              {t(faq.question)}
            </div>
          </AccordionTrigger>
          <AccordionContent className="sm:mb-1 lg:mb-2">
            <div className="text-muted-foreground lg:text-lg">
              {t(faq.answer)}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
