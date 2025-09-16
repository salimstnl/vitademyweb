import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/NavigationMenu";
import Link from "next/link";
import ModeToggle from "./ModeToggle";
// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   SignUpButton,
//   UserButton,
//   useUser,
// } from "@clerk/nextjs";
import { Button } from "./ui/Button";
import Image from "next/image";
import { cn } from "@/lib/utils";
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
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const vitaClasses: { title: string; href: string; description: string }[] = [
  {
    title: "Learning Modules",
    href: "/learn/modules",
    description:
      "Interactive lessons that simplify math, science, and more with engaging activities.",
  },
  {
    title: "Daily Quests",
    href: "/learn/challenges",
    description:
      "Sharpen your mind with fun quests, brain teasers, and logic puzzles.",
  },
  {
    title: "Curiosity Corner",
    href: "/learn/curiosity",
    description:
      "Uncover mind-blowing facts, intriguing questions, and fascinating discoveries.",
  },
];

const vitaVoices: { title: string; href: string; description: string }[] = [
  {
    title: "Articles",
    href: "/learn/articles",
    description:
      "Explore thought-provoking insights, educational content, and inspiring stories.",
  },
  {
    title: "Events",
    href: "/event",
    description:
      "Hands-on sessions where you can experiment, build, and learn through exciting activities.",
  },
];

const vitaConnects: { title: string; href: string; description: string }[] = [
  {
    title: "Our Products",
    href: "/connect/our-products",
    description:
      "Everything we offer — from brain-boosting content to cool community perks.",
  },
  {
    title: "Become a Member",
    href: "/connect/become-a-member",
    description:
      "We have merch! 🎉 Wear your love for learning loud and proud!",
  },
  {
    title: "Career",
    href: "/connect/career",
    description:
      "We have merch! 🎉 Wear your love for learning loud and proud!",
  },
];

const vitaStories: { title: string; href: string; description: string }[] = [
  {
    title: "About Us",
    href: "/story/about-us",
    description:
      "Get to know the people, passion, and purpose behind Vitademy.",
  },
  {
    title: "Contact",
    href: "/story/contact",
    description: "Questions, feedback, or just want to say hi? We’re all ears.",
  },
  {
    title: "FAQ",
    href: "/story/faq",
    description:
      "Got questions? We’ve got answers — quick, clear, and helpful.",
  },
];

const vitaminRedirects: { title: string; href: string; description: string }[] =
  [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      description: "Cool kids only.",
    },
    {
      title: "Add Module",
      href: "/admin/dashboard",
      description: "Add modules for VitaLearn.",
    },
    {
      title: "Add Artice",
      href: "/admin/dashboard",
      description: "Add articles for VitaLearn.",
    },
    {
      title: "Add Shop Item",
      href: "/admin/dashboard",
      description: "Add items for VitaShop.",
    },
    {
      title: "Create FAQ",
      href: "/admin/dashboard",
      description: "Add FAQ for VitaConnect.",
    },
  ];

function DesktopNavbar() {
  // const { user } = useUser();
  // const isAdmin = (user?.publicMetadata as { isAdmin?: boolean })?.isAdmin;
  const [isContactOpen, setContactOpen] = useState(false);

  const [isSending, setIsSending] = useState(false);
  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name"),
      workspace: formData.get("workspace"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      inquiry: formData.get("inquiry"),
    };

    if (!data.name) {
      alert("Please fill in your name first!");
      setIsSending(false);
      return false;
    }
    if (!data.email) {
      alert("Please fill in your email first!");
      setIsSending(false);
      return false;
    }
    if (!data.inquiry) {
      alert("Please fill in your message first!");
      setIsSending(false);
      return false;
    }

    try {
      const res = await fetch("/api/sendMailViaContact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Email sent!");
      } else {
        alert("Failed to send email!");
      }
    } catch (error) {
      console.error("Send error:", error);
      alert("Something went wrong!");
    } finally {
      setIsSending(false); // ⬅️ hide loading
    }
  };

  return (
    <div className="flex justify-between items-center">
      {isSending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white px-6 py-4 rounded-md shadow-md flex items-center space-x-3">
            <svg
              className="animate-spin h-6 w-6 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <span className="text-gray-700 text-sm font-medium">
              Sending your message...
            </span>
          </div>
        </div>
      )}
      <div className="flex gap-6 items-center">
        <Link href="/">
          <Image
            src="/logo-small.png"
            width={30}
            height={20}
            alt="Vitademy Logo"
          ></Image>
        </Link>
        <Dialog open={isContactOpen} onOpenChange={setContactOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={sendEmail}>
              <DialogHeader>
                <DialogTitle>Contact Vita</DialogTitle>
                <DialogDescription>
                  Got anything you want to say to us? Give us a shout!
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-5">
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
                  <Label htmlFor="inquiry">
                    What do you have to say for us?
                  </Label>
                  <Textarea id="inquiry" name="inquiry" />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Send</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <NavigationMenu className="text-2xl">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>VitaClass</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {vitaClasses.map((vitaClass) => (
                    <ListItem
                      key={vitaClass.title}
                      title={vitaClass.title}
                      href={vitaClass.href}
                    >
                      {vitaClass.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>VitaVoice</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {vitaVoices.map((vitaVoice) => (
                    <ListItem
                      key={vitaVoice.title}
                      title={vitaVoice.title}
                      href={vitaVoice.href}
                    >
                      {vitaVoice.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>VitaConnect</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {vitaConnects.map((vitaConnect) => (
                    <ListItem
                      key={vitaConnect.title}
                      title={vitaConnect.title}
                      href={vitaConnect.href}
                    >
                      {vitaConnect.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>VitaStory</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {vitaStories.map((vitaStory) => {
                    const isContact = vitaStory.title === "Contact";
                    return (
                      <div key={vitaStory.title}>
                        {isContact ? (
                          <button
                            onClick={() => setContactOpen(true)}
                            className="text-left w-full"
                          >
                            <ListItem title={vitaStory.title}>
                              {vitaStory.description}
                            </ListItem>
                          </button>
                        ) : (
                          <ListItem
                            title={vitaStory.title}
                            href={vitaStory.href}
                          >
                            {vitaStory.description}
                          </ListItem>
                        )}
                      </div>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {/* {isAdmin && (
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/admin/dashboard">Vitamin</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )} */}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex gap-5 items-center">
        <ModeToggle></ModeToggle>
        {/* <SignedOut>
          <SignInButton mode="modal">
            <Button className="w-30">Sign In</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button className="w-30">Sign Up</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn> */}
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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
  );
});
ListItem.displayName = "ListItem";

export default DesktopNavbar;
