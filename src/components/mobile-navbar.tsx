"use client";

import React, { useState } from "react";
import Link from "next/link";
import ModeToggle from "./mode-toggle";
import Image from "next/image";
import { MenuIcon } from "lucide-react";
import { ReactTyped } from "react-typed";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/Drawer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/Button";
import LanguageSwitcher from "./language-switcher";
import { useTranslations } from "next-intl";
import LogoOnlyImage from "./logo-only-image";
import { signOut } from "next-auth/react";

type MobileNavbarProps = {
  user?: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
    username?: string | null;
    id?: string | null;
  } | null;
};

export default function MobileNavbar({ user }: MobileNavbarProps) {
  const t = useTranslations("Navbar");

  const [isContactOpen, setContactOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const vitaMin = t.raw("vitaMin");
  const vitaClasses = t.raw("vitaClasses");
  const vitaVoices = t.raw("vitaVoices");
  const vitaConnects = t.raw("vitaConnects");
  const vitaStories = t.raw("vitaStories");

  return (
    <div className="flex justify-between items-center">
      {/* Logo */}
      <LogoOnlyImage width={30} height={20}></LogoOnlyImage>

      {/* Contact Dialog */}
      <Dialog open={isContactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("ContactDialog.title")}</DialogTitle>
            <DialogDescription>
              {t("ContactDialog.description")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="workspace">Workspace</Label>
              <Input id="workspace" name="workspace" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="inquiry">{t("ContactDialog.inquiryLabel")}</Label>
              <Textarea id="inquiry" name="inquiry" />
            </div>
          </div>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button variant="outline">{t("ContactDialog.cancel")}</Button>
            </DialogClose>
            <Button type="submit" className="w-full">
              {t("ContactDialog.send")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Right side: Language + Dark Mode + Drawer Menu */}
      <div className="flex gap-5 items-center">
        <LanguageSwitcher />
        <ModeToggle />
        <Drawer direction="left">
          <DrawerTrigger asChild>
            <MenuIcon />
          </DrawerTrigger>
          <DrawerContent>
            {/* Header */}
            <div className="border-b-2 p-10">
              <h1 className="font-bold text-xl">
                <ReactTyped
                  strings={["Vitademy.", "ヴィタデミー.", "비타데미."]}
                  typeSpeed={60}
                  backSpeed={70}
                  loop
                />
              </h1>
            </div>

            {/* Accordion Menu */}
            <Accordion type="single" collapsible>
              <AccordionItem
                value="userMenu"
                className="py-2 px-10 bg-[#f7f0fd] dark:bg-gray-800"
              >
                <AccordionTrigger>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold">
                      Hello, {user ? user.name : "Vitapals"}
                    </span>
                    <span className="font-extralight">
                      {user
                        ? t("loggedInWelcomeMessageMobile")
                        : t("notLoggedInWelcomeMessageMobile")}
                    </span>
                  </div>
                </AccordionTrigger>
                {!user ? (
                  <AccordionContent>
                    <div className="p-5">
                      <a href="/register" className="hover:underline">
                        {t("registerMessage")}
                      </a>
                    </div>
                    <div className="p-5">
                      <a href="/login" className="hover:underline">
                        {t("loginMessage")}
                      </a>
                    </div>
                  </AccordionContent>
                ) : (
                  <AccordionContent>
                    <div className="p-5">
                      <a href="/profile" className="hover:underline">
                        Customize your profile
                      </a>
                    </div>
                    <div className="p-5">
                      <a
                        onClick={async () => {
                          if (loggingOut) return; // prevent double click
                          setLoggingOut(true);
                          signOut();
                        }}
                        className={`cursor-pointer transition-opacity duration-300 ${
                          loggingOut
                            ? "text-gray-400 pointer-events-none opacity-70"
                            : "text-red-500 hover:underline opacity-100"
                        }`}
                      >
                        {loggingOut
                          ? "Logging out..."
                          : "Logout of your account"}
                      </a>
                    </div>
                  </AccordionContent>
                )}
              </AccordionItem>
              {[
                { label: "VitaMin", items: vitaMin, adminOnly: true },
                { label: "VitaClass", items: vitaClasses },
                { label: "VitaVoice", items: vitaVoices },
                { label: "VitaConnect", items: vitaConnects },
                { label: "VitaStory", items: vitaStories },
              ]
                // Only include VitaMin if user is admin
                .filter(
                  (section) => !section.adminOnly || user?.role === "ADMIN"
                )
                .map(({ label, items }) => (
                  <AccordionItem
                    key={label}
                    value={label}
                    className="py-2 px-10"
                  >
                    <AccordionTrigger className="text-md">
                      {t(label)}
                    </AccordionTrigger>
                    <AccordionContent>
                      {items.map((item: any) => {
                        const isContact =
                          item.title === "Contact" || item.title === "Kontak";
                        return (
                          <div key={item.title} className="px-10 py-5">
                            {isContact ? (
                              <a onClick={() => setContactOpen(true)}>
                                {item.title}
                              </a>
                            ) : (
                              <a href={item.href}>{item.title}</a>
                            )}
                          </div>
                        );
                      })}
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
