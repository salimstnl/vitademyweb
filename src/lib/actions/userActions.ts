"use server";

import prisma from "../prisma";
import bcrypt from "bcrypt";

export async function createUser(data: {
  username: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}) {
  const username = data.username;
  const name = data.name;
  const email = data.email;
  const phone = data.phone;
  const password = data.password;

  if (!username) {
    return { error: "Please input your username!" };
  }

  if (!name) {
    return { error: "Please input your name!" };
  }

  if (!email) {
    return { error: "Please input your Email!" };
  }

  if (!phone) {
    return { error: "Please input your Phone!" };
  }

  // ✅ Check if username already exists
  const existingUsername = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUsername) {
    return { error: "Username already exists!" };
  }

  // ✅ Email format validation (only if email is provided)
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      return { error: "Please enter a valid email address!" };
    }

    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return { error: "Email already exists!" };
    }
  }

  // ✅ Phone number optional check (basic numeric)
  if (phone) {
    const phoneRegex = /^[0-9+\-()\s]+$/;
    if (!phoneRegex.test(phone)) {
      return { error: "Phone number contains invalid characters!" };
    }

    const existingPhone = await prisma.user.findUnique({ where: { phone } });
    if (existingPhone) {
      return { error: "Phone number already exists!" };
    }
  }

  // ✅ Password validations
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/;

  if (!passwordRegex.test(password)) {
    return {
      error:
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
    };
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
}
