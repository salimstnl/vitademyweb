import React from "react";
import LoginForm from "../login-form";
import RegisterForm from "../register-form";

export default function AuthContainerRightSection({
  mode,
}: {
  mode: "login" | "register";
}) {
  return (
    <div className="w-full bg-white dark:bg-black">
      <div className="p-10 md:p-20">
        {mode === "login" && <LoginForm />}
        {mode === "register" && <RegisterForm />}
      </div>
    </div>
  );
}
