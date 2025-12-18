"use server";

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const formData = await req.formData();

  const username = formData.get("username")?.toString();
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString() || null;
  const phone = formData.get("phone")?.toString() || null;
  const password = formData.get("password")?.toString() || "";

  // === VALIDATIONS ===
  if (!username) {
    return NextResponse.json(
      { error: "Please input your username!" },
      { status: 400 }
    );
  }

  if (!name) {
    return NextResponse.json(
      { error: "Please input your name!" },
      { status: 400 }
    );
  }

  if (!email) {
    return NextResponse.json(
      { error: "Please input your Email!" },
      { status: 400 }
    );
  }

  if (!phone) {
    return NextResponse.json(
      { error: "Please input your Phone!" },
      { status: 400 }
    );
  }

  // ✅ Check if username already exists
  const existingUsername = await prisma.user.findUnique({
    where: { username },
  });
  if (existingUsername) {
    return NextResponse.json(
      { error: "Username already exists!" },
      { status: 400 }
    );
  }

  // ✅ Email format validation (only if email is provided)
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address!" },
        { status: 400 }
      );
    }

    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return NextResponse.json(
        { error: "Email already exists!" },
        { status: 400 }
      );
    }
  }

  // ✅ Phone number optional check (basic numeric)
  if (phone) {
    const phoneRegex = /^[0-9+\-()\s]+$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: "Phone number contains invalid characters!" },
        { status: 400 }
      );
    }

    const existingPhone = await prisma.user.findUnique({ where: { phone } });
    if (existingPhone) {
      return NextResponse.json(
        { error: "Phone number already exists!" },
        { status: 400 }
      );
    }
  }

  // ✅ Password validations
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/;

  if (!passwordRegex.test(password)) {
    return NextResponse.json(
      {
        error:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      },
      { status: 400 }
    );
  }

  // Hash password securely
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      username,
      name,
      email,
      phone,
      password: hashedPassword,
      role: "USER",
    },
  });

  // All is well, lets log the user in
  try {
    var jwt = require("jsonwebtoken");
    const token = jwt.sign({ username, name, email }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({ success: true });
    response.cookies.set("token", token, { httpOnly: true, path: "/" });
    return response;
  } catch (error) {
    console.error("JWT generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate token." },
      { status: 400 }
    );
  }
}
