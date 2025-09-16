"use client";

import React from "react";
import { Button } from "./ui/Button";
import Link from "next/link";
import Image from "next/image";
import { FaDiscord, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { SiX } from "react-icons/si";

const vitaClasses: { title: string; href: string; description: string }[] = [
  {
    title: "Learning Modules",
    href: "/learn/modules",
    description:
      "Interactive lessons that simplify math, science, and more with engaging activities.",
  },
  {
    title: "Daily Quests",
    href: "/learn/challenges",
    description:
      "Sharpen your mind with fun quests, brain teasers, and logic puzzles.",
  },
  {
    title: "Curiosity Corner",
    href: "/learn/curiosity",
    description:
      "Uncover mind-blowing facts, intriguing questions, and fascinating discoveries.",
  },
];

const vitaVoices: { title: string; href: string; description: string }[] = [
  {
    title: "Articles",
    href: "/learn/articles",
    description:
      "Explore thought-provoking insights, educational content, and inspiring stories.",
  },
  {
    title: "Events",
    href: "/event",
    description:
      "Hands-on sessions where you can experiment, build, and learn through exciting activities.",
  },
];

const vitaConnects: { title: string; href: string; description: string }[] = [
  {
    title: "Our Products",
    href: "/connect/our-products",
    description:
      "Everything we offer — from brain-boosting content to cool community perks.",
  },
  {
    title: "Become a Member",
    href: "/connect/become-a-member",
    description:
      "We have merch! 🎉 Wear your love for learning loud and proud!",
  },
  {
    title: "Career",
    href: "/connect/career",
    description:
      "We have merch! 🎉 Wear your love for learning loud and proud!",
  },
];

const vitaStories: { title: string; href: string; description: string }[] = [
  {
    title: "About Us",
    href: "/story/about-us",
    description:
      "Get to know the people, passion, and purpose behind Vitademy.",
  },
  {
    title: "Contact",
    href: "/story/contact",
    description: "Questions, feedback, or just want to say hi? We’re all ears.",
  },
  {
    title: "FAQ",
    href: "/story/faq",
    description:
      "Got questions? We’ve got answers — quick, clear, and helpful.",
  },
];

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

const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js
function scrollToTop() {
  if (!isBrowser()) return;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Footer() {
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
          <div className="flex flex-col gap-4 md:gap-6">
            <h1 className="font-bold">VitaClass</h1>
            {vitaClasses.map((vitaClass) => (
              <Link className="hover:underline" href={vitaClass.href}>
                {vitaClass.title}
              </Link>
            ))}
          </div>
          <div className="mt-12 md:mt-0 flex flex-col gap-4 md:gap-6">
            <h1 className="font-bold">VitaVoice</h1>
            {vitaVoices.map((vitaVoice) => (
              <Link className="hover:underline" href={vitaVoice.href}>
                {vitaVoice.title}
              </Link>
            ))}
          </div>
          <div className="mt-12 md:mt-0 flex flex-col gap-4 md:gap-6">
            <h1 className="font-bold">VitaConnect</h1>
            {vitaConnects.map((vitaConnect) => (
              <Link className="hover:underline" href={vitaConnect.href}>
                {vitaConnect.title}
              </Link>
            ))}
          </div>
          <div className="mt-12 md:mt-0 flex flex-col gap-4 md:gap-6">
            <h1 className="font-bold">VitaStory</h1>
            {vitaStories.map((vitaStory) => (
              <Link className="hover:underline" href={vitaStory.href}>
                {vitaStory.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t dark:border-t-white px-5 md:px-20 py-10">
        <div className="md:flex gap-5 justify-between items-center">
          <div className="md:flex gap-10 items-center">
            <div className="flex gap-5 items-center">
              <Link href="/">
                <Image
                  src="/logo-small.png"
                  width={30}
                  height={20}
                  alt="Vitademy Logo"
                ></Image>
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
