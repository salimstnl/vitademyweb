"use client";

import AuthPageWrapper from "@/components/auth-page-wrapper";
import AuthContainerSection from "@/components/sections/AuthContainerSection";

export default function Login() {
  return (
    <AuthPageWrapper>
      <AuthContainerSection mode="login" />
    </AuthPageWrapper>
  );
}
