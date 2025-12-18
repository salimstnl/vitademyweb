import Image from "next/image";
import React from "react";

export default function HeaderLogoImage() {
  return (
    <div>
      <div className="w-full h-[50vw] lg:h-[30vw] relative">
        <Image
          src="/logo-desktop3.png"
          alt="Vitademy Logo"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        ></Image>
      </div>
    </div>
  );
}
