"use client";

import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/NavigationMenu";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTranslations } from "next-intl";
import ModeToggle from "./mode-toggle";
import LanguageSwitcher from "./language-switcher";
import LogoOnlyImage from "./logo-only-image";
import ContactDialog from "./contact-dialog";
import { signOut } from "next-auth/react";
import DesktopNavbarNavigationMenu from "./desktop-navbar-navigation-menu";

type DesktopNavbarProps = {
  user?: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
    username?: string | null;
    id?: string | null;
  } | null;
};

export default function DesktopNavbar({ user }: DesktopNavbarProps) {
  const t = useTranslations("Navbar");
  const [isContactOpen, setContactOpen] = useState(false);

  return (
    <div className="flex justify-between items-center">
      {/* Left Section */}
      <div className="flex gap-6 items-center">
        <Link href="/">
          <LogoOnlyImage width={30} height={20}></LogoOnlyImage>
        </Link>
        <ContactDialog open={isContactOpen} onOpenChange={setContactOpen} />
        <DesktopNavbarNavigationMenu
          user={user}
          setContactOpen={setContactOpen}
        />
      </div>

      {/* Right Section */}
      <div className="flex gap-5 items-center">
        {user ? (
          <>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    {t("welcomeMessage")}{" "}
                    <span className="font-bold">{user.name}</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <button
                        onClick={() => signOut()}
                        className="text-left w-full"
                      >
                        <ListItem title="Logout">
                          Logout of your account
                        </ListItem>
                      </button>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </>
        ) : (
          <>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          </>
        )}
        <LanguageSwitcher />
        <ModeToggle />
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
    </NavigationMenuLink>
  </li>
));
ListItem.displayName = "ListItem";
