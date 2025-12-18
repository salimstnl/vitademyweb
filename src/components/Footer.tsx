"use client";

import React from "react";
import { Button } from "./ui/Button";
import Link from "next/link";
import { FaDiscord, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { SiX } from "react-icons/si";
import { useTranslations } from "next-intl";
import LogoOnlyImage from "./logo-only-image";

type FooterProps = {
  user?: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
    username?: string | null;
    id?: string | null;
  } | null;
};

export default function Footer({ user }: FooterProps) {
  const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js
  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const t = useTranslations("Navbar");
  const vitaMin = t.raw("vitaMin");
  const vitaClasses = t.raw("vitaClasses");
  const vitaVoices = t.raw("vitaVoices");
  const vitaConnects = t.raw("vitaConnects");
  const vitaStories = t.raw("vitaStories");

  const socialLinks = [
    { icon: <FaDiscord />, url: "https://dsc.gg/vitademy", color: "#5865F2" },
    { icon: <FaWhatsapp />, url: "https://wa.me", color: "#25D366" },
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/vitademyspace/",
      color: "#E4405F",
    },
    { icon: <SiX />, url: "https://x.com", color: "#000000" },
  ];

  return (
    <div>
      <div className="border-t dark:border-t-white px-5 md:px-20 py-10">
        <div className="flex justify-end">
          <Button
            className="inline-flex gap-2 items-center justify-center"
            onClick={scrollToTop}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                stroke-linecap="square"
                stroke-miterlimit="10"
                stroke-width="48"
                d="M112 328l144-144 144 144"
              ></path>
            </svg>
            Go to Top
          </Button>
        </div>
        <div className="md:grid md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "VitaMin", items: vitaMin, adminOnly: true },
            { label: "VitaClass", items: vitaClasses },
            { label: "VitaVoice", items: vitaVoices },
            { label: "VitaConnect", items: vitaConnects },
            { label: "VitaStory", items: vitaStories },
          ]
            // Only include VitaMin if user is admin
            .filter((section) => !section.adminOnly || user?.role === "ADMIN")
            .map(({ label, items }) => (
              <div className="flex flex-col gap-4 md:gap-6 mb-20">
                <h1 className="font-bold">{t(label)}</h1>
                {items.map((item: any) => (
                  <Link
                    className="hover:underline"
                    href={item.href}
                    key={item.href}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            ))}
        </div>
      </div>
      <div className="border-t dark:border-t-white px-5 md:px-20 py-10">
        <div className="md:flex gap-5 justify-between items-center">
          <div className="md:flex gap-10 items-center">
            <div className="flex gap-5 items-center">
              <Link href="/">
                <LogoOnlyImage width={30} height={20}></LogoOnlyImage>
              </Link>
              <h1 className="dark:text-gray-400 text-gray-500">
                © 2025 Vitademy. All rights reserved.
              </h1>
            </div>
            <div className="flex gap-10 items-center justify-center md:justify-start mt-5 md:mt-0">
              <Link href="/terms-of-use" className="hover:underline">
                Terms of Use
              </Link>
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </div>
          </div>
          <div className="flex gap-4 justify-center md:justify-start mt-5 md:mt-0">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full text-white transition-transform duration-300 transform hover:scale-110"
                style={{
                  backgroundColor: link.color,
                  boxShadow: `0 4px 15px ${link.color}80`,
                }}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t dark:border-t-white px-5 md:px-20 py-10 text-gray-500">
        <p className="leading-loose text-center">
          Vitademy is an independent, decentralised learning platform. All
          content, materials, and resources are for educational purposes only
          and do not constitute professional, financial, or legal advice.
          Vitademy is not responsible for user-contributed content within the
          open forum.
        </p>
      </div>
    </div>
  );
}
