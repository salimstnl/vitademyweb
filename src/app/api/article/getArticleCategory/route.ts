import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await prisma.articleCategory.findMany();

  if (!categories) {
    return NextResponse.json({ success: false });
  }

  return NextResponse.json({ success: true, categories: categories });
}
