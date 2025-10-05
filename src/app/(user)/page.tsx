"use client";

import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { ReactTyped } from "react-typed";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import CategoryBadge from "@/components/ui/CategoryBadge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import SectionHeader from "@/components/ui/SectionHeader";
import { useState } from "react";
import ContactDialog from "@/components/ContactDialog";
import { learningModules } from "@/data/modules";
import { faqs } from "@/data/faqs";
import { masterclasses } from "@/data/masterclasses";
import MasterclassCard from "@/components/MasterclassCard";

export default function Home() {
  const [isContactOpen, setContactOpen] = useState(false);
  return (
    <div>
      <ContactDialog open={isContactOpen} onOpenChange={setContactOpen} />
      <div className="w-full h-[50vw] lg:h-[25vw] relative">
        <Image
          src="/logo-desktop.png"
          alt="Vitademy Logo"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        ></Image>
      </div>
      <div className="px-5 md:px-20 py-10">
        <div className="flex flex-col gap-12 md:gap-24">
          <section className="flex flex-col gap-3 items-center">
            <ReactTyped
              className="flex justify-center items-center text-xl text-[#32078E] dark:text-[#8C58FF]"
              strings={["Vitademy.", "ヴィタデミー.", "비타데미."]}
              typeSpeed={40}
              backSpeed={50}
              loop
            />
            <p className="text-center font-black text-4xl">
              Welcome to Vitademy
            </p>
            <p className="text-center text-[#7a7a7a] dark:text-[#8C8C8C]">
              The greatest space to learn.
            </p>
            <Button
              className="w-50 mt-5"
              size="lg"
              onClick={() => setContactOpen(true)}
            >
              Let's Stay in Touch
            </Button>
          </section>
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-10">
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
                    Up-to-date Learning Space
                  </p>
                  <p>Explore countless topics.</p>
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
                    World-class Workshops
                  </p>
                  <p>Hands-On Learning, Global Standards.</p>
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
                    Brain-boosting Live Seminars
                  </p>
                  <p>Ideas That Ignite Your Potential.</p>
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
                    Ever-growing Community
                  </p>
                  <p>Connect with other learners.</p>
                </div>
              </div>
            </Link>
          </section>
          {/* Masterclass Desktop */}
          <section>
            <div className="flex flex-col gap-10">
              <div className="hidden md:grid md:grid-cols-3 md:gap-10">
                <div className="flex flex-col gap-5">
                  <CategoryBadge>Masterclasses</CategoryBadge>
                  <h1 className="text-6xl font-black">
                    Learn from the Best. Become the Best.
                  </h1>
                </div>

                {masterclasses.map((item, i) => (
                  <MasterclassCard key={i} {...item} />
                ))}
              </div>
            </div>
          </section>
          {/* Mobile Masterclass */}
          <section className="grid grid-cols-1 gap-10 md:hidden">
            <h1 className="text-4xl text-center font-black col-span-2">
              Masterclass: Learn from the Best. Become the Best.
            </h1>
            <div className="col-span-2 block md:hidden">
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={20}
                slidesPerView={1}
                className="rounded-2xl"
              >
                {masterclasses.map((item, i) => (
                  <SwiperSlide key={i}>
                    <MasterclassCard {...item} isMobile />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
          <section id="what-we-give">
            <SectionHeader>What We Do</SectionHeader>
            <div className="flex flex-col gap-20 md:gap-40">
              <div className="grid md:grid-cols-2">
                <div className="flex flex-col gap-10">
                  <h1 className="font-bold text-3xl text-center md:text-start md:text-5xl leading-relaxed">
                    Omnidirectional Learning: A 360° Approach to Education.
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
                    Omnidirectional learning helps you learn in different ways —
                    using fun methods, real-life examples, and creative thinking
                    to understand things better and solve problems easily.
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
                    src="/what-we-give/connect.jpg"
                    alt="Learning Module Thumbnail"
                    width={600}
                    height={600}
                    className="rounded-2xl ease-in-out duration-200 group-hover:scale-110"
                  ></Image>
                </div>
                <div className="flex flex-col gap-10">
                  <h1 className="font-bold text-3xl text-center md:text-start md:text-5xl leading-relaxed">
                    Connect Knowledge like Your Brain.
                  </h1>
                  <div className="md:hidden flex items-center">
                    <Image
                      src="/what-we-give/connect.jpg"
                      alt="Learning Module Thumbnail"
                      width={600}
                      height={600}
                      className="rounded-2xl ease-in-out duration-200 group-hover:scale-110"
                    ></Image>
                  </div>
                  <p className="leading-loose text-lg md:text-xl text-justify">
                    Our platform connects ideas across disciplines — just like
                    your brain does. Every topic is curated to build a seamless,
                    interconnected understanding.
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2">
                <div className="flex flex-col gap-10">
                  <h1 className="font-bold text-3xl text-center md:text-start md:text-5xl leading-relaxed">
                    Find Your Style, Learn Your Way.
                  </h1>
                  <div className="md:hidden flex justify-center">
                    <Image
                      src="/what-we-give/find-your-style.jpg"
                      alt="Learning Module Thumbnail"
                      width={600}
                      height={200}
                      className="rounded-2xl ease-in-out duration-200 group-hover:scale-110"
                    ></Image>
                  </div>
                  <div className="leading-loose flex flex-col gap-5 text-lg md:text-xl text-justify">
                    <div>
                      At Vitademy, you control the pace. Our decentralised
                      platform lets you explore, practice, and grow — anytime,
                      anywhere.
                    </div>
                    <div className="underline underline-offset-8"> Access:</div>
                    <div>
                      <p>✅ Engaging Video Lessons</p>
                      <p>✅ Easy-to-digest Text Summaries & Lecture Notes</p>
                      <p>✅ Real-time Voiceover Explanations</p>
                      <p>✅ Interactive Problem Sheets & Practice Modules</p>
                    </div>
                    <div>
                      No rigid schedules. No limits. Education that adapts to
                      you — not the other way around.
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex justify-center">
                  <Image
                    src="/what-we-give/find-your-style.jpg"
                    alt="Learning Module Thumbnail"
                    width={600}
                    height={200}
                    className="rounded-2xl ease-in-out duration-200 group-hover:scale-110"
                  ></Image>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="flex-grow border-t-4 border-gray-300 dark:border-gray-600 mb-12" />
            <div className="flex flex-col gap-5">
              <h1 className="text-4xl font-extrabold">
                Browse Our Learning Modules
              </h1>
              <p className="text-lg mb-5">
                Our learning modules recommended for you
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 italic mt-2">
                Swipe me →
              </p>
              <div className="w-full">
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
                  {learningModules.map((learningModule, index) => (
                    <SwiperSlide key={index}>
                      <Link href="" className="group">
                        <div className="flex flex-col">
                          <div className="relative overflow-hidden rounded-2xl">
                            <Image
                              src={learningModule.imageURL}
                              alt="Learning Module Thumbnail"
                              width={400}
                              height={200}
                              className="rounded-2xl ease-in-out duration-200 group-hover:scale-110"
                            ></Image>
                          </div>
                          <div className="py-5">
                            <h1 className="text-2xl font-bold group-hover:underline">
                              {learningModule.title}
                            </h1>
                            <div className="py-5">
                              <p className="italic">
                                {learningModule.createdDate}
                              </p>
                              <p className="uppercase text-stone-400">
                                {learningModule.creatorName}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="flex justify-center">
                <Link href="/learn/modules">
                  <Button>View More</Button>
                </Link>
              </div>
            </div>
          </section>
          <section>
            <SectionHeader>What We Give</SectionHeader>
            <div className="hidden md:grid md:grid-cols-3 md:gap-10">
              <div className="col-span-2 from-20% to-60% from-[#7efca0]/10 to-[#7efca0]/5 dark:from-[#5cff88]/20 dark:to-[#5cff88]/10 border-[#5cff88]/10 bg-gradient-to-b rounded-2xl border-2 p-10 grid grid-cols-2 gap-16">
                <div className="flex flex-col gap-10">
                  <h2 className="text-3xl font-black">
                    Decentralised Forum. Knowledge Without Borders.
                  </h2>
                  <p className="text-justify">
                    Vitademy’s open forum lets anyone share, ask, and learn — no
                    gatekeeping, just real, community-driven education.
                  </p>
                  <Link href="/learn/modules">
                    <Button>Start Asking</Button>
                  </Link>
                </div>
                <div>
                  <Image
                    src="/free_modules.jpg"
                    alt="Free Modules"
                    width={400}
                    height={400}
                    className="rounded-2xl"
                  ></Image>
                </div>
              </div>
              <div className="row-span-2 from-20% to-60% from-[#c7106c]/10 to-[#c7106c]/5 dark:from-[#bf2a75]/20 dark:to-[#bf2a75]/10 border-[#bf2a75]/10 bg-gradient-to-b rounded-2xl border-2 p-10">
                <div className="flex flex-col gap-20">
                  <div className="flex flex-col gap-5">
                    <h2 className="text-3xl font-black">
                      Join Events. Stay Connected.
                    </h2>
                    <p className="text-justify">
                      Learn beyond the platform. Join our workshops, seminars,
                      and networking events to connect with passionate learners
                      worldwide — grow your knowledge and your network.
                    </p>
                    <Link href="/event/workshops">
                      <Button>I'm Interested</Button>
                    </Link>
                  </div>
                  <div>
                    <Image
                      src="/education_event.jpg"
                      alt="Education Event"
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
                    src="/one_on_one.jpg"
                    alt="One on One Consulting"
                    width={400}
                    height={400}
                    className="rounded-2xl"
                  ></Image>
                </div>
                <div className="flex flex-col gap-10">
                  <h2 className="text-3xl font-black">
                    One-on-One Consultations. Personalised Just For You.
                  </h2>
                  <p className="text-justify">
                    Get personalised guidance to overcome challenges, set clear
                    goals, and stay on track — tailored to your learning
                    journey.
                  </p>
                  <Link href="">
                    <Button>Meet Our Consultors</Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Mobile What We Do */}
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
                      <h2 className="text-3xl font-black">
                        🌍 Decentralised Forum. Knowledge Without Borders.
                      </h2>
                      <p>
                        Vitademy’s open forum lets anyone share, ask, and learn
                        — no gatekeeping, just real, community-driven education.
                      </p>
                      <Link href="/learn/modules">
                        <Button>Start Asking</Button>
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
                      <h2 className="text-3xl font-black">
                        📅 Join Events. Stay Connected.
                      </h2>
                      <p>
                        Learn beyond the platform. Join our workshops, seminars,
                        and networking events to connect with passionate
                        learners worldwide — grow your knowledge and your
                        network.
                      </p>
                      <Link href="/event/workshops">
                        <Button>I'm Interested</Button>
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
                      <h2 className="text-3xl font-black">
                        🎯 One-on-One Consultations. Personalised Just For You.
                      </h2>
                      <p className="text-justify">
                        Get personalised guidance to overcome challenges, set
                        clear goals, and stay on track — tailored to your
                        learning journey.
                      </p>
                      <Link href="">
                        <Button>Meet Our Consultors</Button>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </section>
          <section>
            <div className="flex flex-col gap-5">
              <CategoryBadge>Vitademy Community</CategoryBadge>
              <div className="grid grid-cols-3 gap-5">
                <div className="col-span-3 md:col-span-2">
                  <div className="flex flex-col gap-5">
                    <h1 className="text-6xl font-black">Be Part Of The Fam.</h1>
                    <div className="flex flex-col gap-10">
                      <p className="text-xl">
                        Learning can be tough, but you’re never alone at
                        Vitademy. Our friendly community is full of learners and
                        mentors ready to guide you through challenges, big or
                        small.
                      </p>
                      <p className="text-xl">
                        Whether you're stuck on schoolwork or exploring new
                        ideas, our members are here to help. Ask questions,
                        share thoughts, and connect with people who want to see
                        you succeed.
                      </p>
                      <p className="text-xl">
                        At Vitademy, we believe learning is better together.
                        Whenever you need support, our community is here to
                        encourage and inspire you every step of the way.
                      </p>
                      <Link href="" className="text-center">
                        <Button size="lg">Join the community</Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-span-3 md:col-span-1">
                  <Image
                    src="/community.jpg"
                    alt="Community"
                    width={500}
                    height={500}
                    className="rounded-2xl"
                  ></Image>
                </div>
              </div>
            </div>
          </section>
          <section id="faq">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl md:rounded-full py-15 px-5 md:p-20">
              <h1 className="text-4xl font-bold text-center mb-10">
                Frequently Asked Questions:
              </h1>
              <div className="flex flex-col items-center">
                <Accordion
                  type="single"
                  collapsible
                  className="mx-auto w-full lg:max-w-3xl p-10"
                >
                  {faqs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
                        <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                          {faq.question}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="sm:mb-1 lg:mb-2">
                        <div className="text-muted-foreground lg:text-lg">
                          {faq.answer}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <Button className="text-center flex justify-center">
                  More Questions
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
