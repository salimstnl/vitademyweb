"use server";

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { emailOrUsername, password } = await req.json();

  // === VALIDATIONS ===
  if (!emailOrUsername) {
    return NextResponse.json(
      { error: "Please input your email / username!" },
      { status: 400 }
    );
  }

  if (!password) {
    return NextResponse.json(
      { error: "Please input your password!" },
      { status: 400 }
    );
  }

  // ✅ Check if email or username already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
    },
  });

  if (!existingUser) {
    return NextResponse.json(
      { error: "Username or email doesn't exist!" },
      { status: 400 }
    );
  }

  // check password
  var hashedExistingPassword = existingUser.password;
  var checkPassword = await bcrypt.compare(password, hashedExistingPassword);
  console.log(checkPassword);
  if (!checkPassword) {
    return NextResponse.json({ error: "Incorrect password!" }, { status: 400 });
  }

  // All is well, lets log the user in
  try {
    var jwt = require("jsonwebtoken");
    const token = jwt.sign(
      {
        id: existingUser.id,
        username: existingUser.username,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );
    const response = NextResponse.json({ token });
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
