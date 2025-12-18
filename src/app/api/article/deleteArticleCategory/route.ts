import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();

  const deleteConfirmation = formData.get("deleteConfirmation")?.toString();
  const categoryId = formData.get("categoryId")?.toString();
  const categoryName = formData.get("categoryName")?.toString();

  if (!deleteConfirmation) {
    return NextResponse.json(
      {
        error:
          "Please type " +
          categoryName +
          " in the text field to confirm your deletion!",
      },
      { status: 400 }
    );
  }

  if (deleteConfirmation != categoryName) {
    return NextResponse.json(
      {
        error:
          "Incorrect confirmation text. Please type " +
          categoryName +
          " in the text field to confirm your deletion!",
      },
      { status: 400 }
    );
  }

  try {
    await prisma.articleCategory.delete({
      where: {
        id: categoryId,
      },
    });
  } catch (Exception) {
    return NextResponse.json(
      {
        error: "An error occured. Please try again later.",
      },
      { status: 400 }
    );
  }

  const response = NextResponse.json({ success: true });
  return response;
}
