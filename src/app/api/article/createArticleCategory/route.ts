"use server";

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const categoryName = formData.get("categoryName")?.toString();

  // Empty validations
  if (!categoryName) {
    return NextResponse.json(
      { error: "Please input category!" },
      { status: 400 }
    );
  }

  // Category already exists validation
  const existingCategory = await prisma.articleCategory.findUnique({
    where: {
      name: categoryName,
    },
  });

  if (existingCategory) {
    return NextResponse.json(
      { error: "Category " + categoryName + " already exists!" },
      { status: 400 }
    );
  }

  // Slugify
  var slugify = require("slugify");
  var slug = slugify(categoryName);

  // Save data
  await prisma.articleCategory.create({
    data: {
      name: categoryName,
      slug: slug,
    },
  });

  const response = NextResponse.json({ success: true });
  return response;
}
