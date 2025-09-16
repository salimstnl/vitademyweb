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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/Button";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ContactDialog({
  open,
  onOpenChange,
}: ContactDialogProps) {
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
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              <Input id="name" name="name" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="workspace">Workspace</Label>
              <Input id="workspace" name="workspace" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="inquiry">What do you have to say for us?</Label>
              <Textarea id="inquiry" name="inquiry" required />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isSending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSending}>
              {isSending ? "Sending..." : "Send"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
