import { Button } from "@/components/ui/Button";
import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <div>
      <div className="relative h-[192px] w-full md:h-[256px] lg:h-[320px] xl:h-[576px] 2xl:h-[672px]">
        <Image
          src="/logo-desktop.png"
          alt="Vitademy Logo"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
        <div className="hidden absolute inset-0 dark:bg-black/70 bg-white/70 w-1/4 backdrop-blur-md mx-12 my-12 p-10 md:flex flex-col justify-between gap-6 rounded-xl overflow-auto">
          <h4 className="text-md font-light text-gray-500 dark:text-gray-300">
            OUR STORY
          </h4>
          <h1 className="text-5xl font-black overflow-hidden">
            Lesson One: Who We Are
          </h1>
          <p>
            Vitademy aims to revolutionize education through decentralization
            and adaptability, making mathematics and related subjects more
            engaging and practical for learners worldwide.
          </p>
          <Button>Get Started</Button>
        </div>
      </div>
    </div>
  );
}
