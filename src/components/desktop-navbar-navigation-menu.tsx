import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/NavigationMenu";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type DesktopNavbarNavigationMenuProps = {
  user: any;
  setContactOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DesktopNavbarNavigationMenu({
  user,
  setContactOpen,
}: DesktopNavbarNavigationMenuProps) {
  const t = useTranslations("Navbar");
  const vitaMin = t.raw("vitaMin");
  const vitaClasses = t.raw("vitaClasses");
  const vitaVoices = t.raw("vitaVoices");
  const vitaConnects = t.raw("vitaConnects");
  const vitaStories = t.raw("vitaStories");

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {[
          { label: "VitaMin", items: vitaMin, adminOnly: true },
          { label: "VitaClass", items: vitaClasses },
          { label: "VitaVoice", items: vitaVoices },
          { label: "VitaConnect", items: vitaConnects },
          { label: "VitaStory", items: vitaStories },
        ]
          // Only include VitaMin if user is admin
          .filter((section) => !section.adminOnly || user?.role === "ADMIN")
          .map(({ label, items }) => (
            <NavigationMenuItem key={label}>
              <NavigationMenuTrigger>{t(label)}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {items.map((item: any) => {
                    const isContact =
                      item.title === "Contact" || item.title === "Kontak";
                    return isContact ? (
                      <button
                        key={item.title}
                        onClick={() => setContactOpen(true)}
                        className="text-left w-full"
                      >
                        <ListItem title={item.title}>
                          {item.description}
                        </ListItem>
                      </button>
                    ) : (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                      >
                        {item.description}
                      </ListItem>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
      </NavigationMenuList>
    </NavigationMenu>
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
