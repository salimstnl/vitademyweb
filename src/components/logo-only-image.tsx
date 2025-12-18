import Image from "next/image";
import React from "react";

export default function LogoOnlyImage({ width = 400, height = 400 }) {
  return (
    <div className="relative">
      {/* Light mode logo */}
      <Image
        src="/logo-small.png"
        alt="Vitademy Logo"
        width={width}
        height={height}
        className="block dark:hidden"
        priority
      />
      {/* Dark mode logo */}
      <Image
        src="/logo-small-white.png"
        alt="Vitademy Logo (Dark)"
        width={width}
        height={height}
        className="hidden dark:block"
        priority
      />
    </div>
  );
}
