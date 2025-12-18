"use client";

import React, { useEffect, useState } from "react";
import DesktopNavbar from "./desktop-navbar";
import MobileNavbar from "./mobile-navbar";
import { useMediaQuery } from "./ui/UseMediaQuery";

type NavbarProps = {
  user?: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
    username?: string | null;
    id?: string | null;
  } | null;
};

export default function Navbar({ user }: NavbarProps) {
  // Get User Token

  const isDesktop = useMediaQuery("(min-width: 768px)");
  return isDesktop ? (
    <div className="px-12 py-5 border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <DesktopNavbar user={user} />
    </div>
  ) : (
    <div className="px-12 py-5 border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <MobileNavbar user={user} />
    </div>
  );
}
