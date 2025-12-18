import React, { useState } from "react";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/Button";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [registering, setRegistering] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setRegistering(true);

    const formData = new FormData(e.currentTarget);

    // Create user first
    const res = await fetch("/api/user/createUser", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      setRegistering(false);
      return;
    }

    // Auto-login using NextAuth credentials provider
    const loginResult = await signIn("credentials", {
      redirect: false,
      emailOrUsername: data.user.email, // or username, depends on your logic
      password: formData.get("password") as string,
    });

    if (loginResult?.error) {
      setError(loginResult.error);
      setRegistering(false);
      return;
    }

    // Success → redirect
    window.location.href = "/";
  }

  function googleLogin() {
    setError("This feature is not available yet!");
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="vitapals_321"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input id="name" name="name" type="text" placeholder="Vitapals" />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="text"
            placeholder="m@example.com"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
          <Input
            id="phone"
            name="phone"
            type="text"
            placeholder="0812-3456-789"
            inputMode="tel"
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^0-9+\-()\s]/g, "");
            }}
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
          {!registering ? (
            <Button type="submit" className="w-1/2">
              Register
            </Button>
          ) : (
            <Button className="w-1/2" disabled>
              Registering...
            </Button>
          )}
          <Button type="button" className="w-1/2" onClick={googleLogin}>
            Continue with Google
          </Button>
          <FieldDescription className="text-center">
            Already have an account? <Link href="/login">Sign in</Link>
          </FieldDescription>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </Field>
      </FieldGroup>
    </form>
  );
}
