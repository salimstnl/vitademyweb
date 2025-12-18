import React from "react";
import AuthContainerLeftSection from "./AuthContainerLeftSection";
import AuthContainerRightSection from "./AuthContainerRightSection";

type AuthMode = "login" | "register";

interface AuthContainerSectionProps {
  mode: AuthMode;
}

export default function AuthContainerSection({
  mode,
}: AuthContainerSectionProps) {
  return (
    <div className="flex flex-col md:flex-row justify-around rounded-4xl">
      <AuthContainerLeftSection />
      <AuthContainerRightSection mode={mode} />
    </div>
  );
}
