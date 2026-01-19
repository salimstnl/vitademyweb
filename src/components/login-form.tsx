import React, { useState } from "react";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/Button";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoggingIn(true);

    const formData = new FormData(e.currentTarget);
    const emailOrUsername = formData.get("emailOrUsername") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      redirect: false,
      emailOrUsername,
      password,
    });

    setLoggingIn(false);

    if (result?.error) {
      let error = setError(
        result.error === "CredentialsSignin"
          ? "Incorrect email, username or password."
          : result.error
      );
      return;
    }

    // success → redirect to homepage
    window.location.href = "/";
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email or Username</FieldLabel>
          <Input
            id="emailOrUsername"
            name="emailOrUsername"
            type="text"
            placeholder="Enter your email or username..."
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="pr-10" // adds space so icon doesn’t overlap text
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>{" "}
          </div>
        </Field>
        <Field className="">
          {!loggingIn ? (
            <Button type="submit" className="w-1/2">
              Login
            </Button>
          ) : (
            <Button className="w-1/2" disabled>
              Logging in...
            </Button>
          )}
          <Button onClick={() => signIn("google")} className="w-1/2">
            Login with Google
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account? <Link href="/register">Sign up</Link>
          </FieldDescription>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </Field>
      </FieldGroup>
    </form>
  );
}
