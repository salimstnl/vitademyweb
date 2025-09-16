import React, { useState } from "react";
import Link from "next/link";
import ModeToggle from "./ModeToggle";
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
// import { useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/Button";

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

function MobileNavbar() {
  // const { user } = useUser();
  // const isAdmin = (user?.publicMetadata as { isAdmin?: boolean })?.isAdmin;
  const [isContactOpen, setContactOpen] = useState(false);

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-6 items-center">
        <Link href="/">
          <Image
            src="/logo-small.png"
            width={30}
            height={20}
            alt="Vitademy Logo"
          ></Image>
        </Link>
      </div>
      <Dialog open={isContactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Contact Vita</DialogTitle>
            <DialogDescription>
              Got anything you want to say to us? Give us a shout!
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
              <Label htmlFor="inquiry">What do you have to say for us?</Label>
              <Textarea id="inquiry" name="inquiry" />
            </div>
          </div>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="w-full">
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="flex gap-5 items-center">
        <ModeToggle></ModeToggle>
        <Drawer direction="left">
          <DrawerTrigger asChild>
            <MenuIcon />
          </DrawerTrigger>
          <DrawerContent>
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
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="py-2 px-10">
                <AccordionTrigger className="text-md">
                  VitaClass
                </AccordionTrigger>
                <AccordionContent className="AccordionContent">
                  {vitaClasses.map((vitaClass) => (
                    <div className="px-10 py-5">
                      <a href={vitaClass.href}>{vitaClass.title}</a>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="py-2 px-10">
                <AccordionTrigger className="text-md">
                  VitaVoice
                </AccordionTrigger>
                <AccordionContent className="AccordionContent">
                  {vitaVoices.map((vitaVoice) => (
                    <div className="px-10 py-5">
                      <a href={vitaVoice.href}>{vitaVoice.title}</a>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="py-2 px-10">
                <AccordionTrigger className="text-md">
                  VitaConnect
                </AccordionTrigger>
                <AccordionContent className="AccordionContent">
                  {vitaConnects.map((vitaConnect) => (
                    <div className="px-10 py-5">
                      <a href={vitaConnect.href}>{vitaConnect.title}</a>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="py-2 px-10">
                <AccordionTrigger className="text-md">
                  VitaStory
                </AccordionTrigger>
                <AccordionContent className="AccordionContent">
                  {vitaStories.map((vitaStory) => {
                    const isContact = vitaStory.title === "Contact";
                    return (
                      <div key={vitaStory.title}>
                        {isContact ? (
                          <div className="px-10 py-5">
                            <a onClick={() => setContactOpen(true)}>
                              {vitaStory.title}
                            </a>
                          </div>
                        ) : (
                          <div className="px-10 py-5">
                            <a href={vitaStory.href}>{vitaStory.title}</a>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {vitaStories.map((vitaStory) => (
                    <div className="px-10 py-5">
                      <a href={vitaStory.href}>{vitaStory.title}</a>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
              {/* {isAdmin && (
                <AccordionItem value="item-5" className="py-2 px-10">
                  <AccordionTrigger className="text-md">
                    VitaMin
                  </AccordionTrigger>
                  <AccordionContent className="AccordionContent">
                    {vitaminRedirects.map((vitaminRedirect) => (
                      <div className="px-10 py-5">
                        <a href={vitaminRedirect.href}>
                          {vitaminRedirect.title}
                        </a>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              )} */}
            </Accordion>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}

export default MobileNavbar;
