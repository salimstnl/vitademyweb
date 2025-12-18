"use client";

import AuthPageWrapper from "@/components/auth-page-wrapper";
import AuthContainerSection from "@/components/sections/AuthContainerSection";

export default function Register() {
  return (
    // Desktop Design
    <AuthPageWrapper>
      <AuthContainerSection mode="register" />
    </AuthPageWrapper>

    // Mobile Design
  );
}
