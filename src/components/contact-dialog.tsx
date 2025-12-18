"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import LoadingOverlay from "./loading-overlay";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ContactDialog({
  open,
  onOpenChange,
}: ContactDialogProps) {
  const t = useTranslations("Navbar");
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
      return;
    }
    if (!data.email) {
      alert("Please fill in your email first!");
      setIsSending(false);
      return;
    }
    if (!data.inquiry) {
      alert("Please fill in your message first!");
      setIsSending(false);
      return;
    }

    try {
      const res = await fetch("/api/sendMailViaContact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Email sent!");
        e.currentTarget.reset(); // clear form after success
        onOpenChange(false); // close dialog
      } else {
        alert("Failed to send email!");
      }
    } catch (error) {
      console.error("Send error:", error);
      alert("Something went wrong!");
    } finally {
      setIsSending(false); // hide loading spinner
    }
  };

  return (
    <div>
      {isSending && <LoadingOverlay />}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={sendEmail}>
            <DialogHeader>
              <DialogTitle>{t("ContactDialog.title")}</DialogTitle>
              <DialogDescription>
                {t("ContactDialog.description")}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-5">
              <Input name="name" placeholder="Name" />
              <Input name="workspace" placeholder="Workspace" />
              <Input name="email" placeholder="Email" />
              <Input name="phone" placeholder="Phone" />
              <Textarea name="inquiry" placeholder="Your message..." />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">{t("ContactDialog.cancel")}</Button>
              </DialogClose>
              <Button type="submit">{t("ContactDialog.send")}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
