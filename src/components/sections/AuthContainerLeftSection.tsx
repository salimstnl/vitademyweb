import React from "react";
import LogoOnlyImage from "../logo-only-image";
import { ReactTyped } from "react-typed";

export default function AuthContainerLeftSection() {
  return (
    <div className="w-full px-10 py-36 bg-[#f2ebff] dark:bg-[#32078E]">
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="w-25 md:w-100">
          <LogoOnlyImage></LogoOnlyImage>
        </div>
        <div className="text-center flex flex-col gap-2">
          <ReactTyped
            className="flex justify-center items-center font-bold text-2xl"
            strings={["Vitademy.", "ヴィタデミー.", "비타데미."]}
            typeSpeed={40}
            backSpeed={50}
            loop
          />
          <p className="text-xl font-extralight">The greatest space to learn</p>
        </div>
      </div>
    </div>
  );
}
