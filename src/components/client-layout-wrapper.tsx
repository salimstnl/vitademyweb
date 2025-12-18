"use client";

import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { SessionProvider, useSession } from "next-auth/react";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <SessionContent>{children}</SessionContent>
    </SessionProvider>
  );
}

function capitalize(word?: string | null) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function SessionContent({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const formattedUser = session?.user
    ? {
        ...session.user,
        name: capitalize(session.user.name), // <-- transform safely
      }
    : null;
  return (
    <>
      <Navbar user={formattedUser} />
      {children}
      <Footer user={formattedUser} />
    </>
  );
}
