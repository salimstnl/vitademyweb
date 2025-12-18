import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json({ loggedIn: false });
  }

  try {
    var jwt = require("jsonwebtoken");

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.json({ loggedIn: true, user: decoded });
  } catch {
    return NextResponse.json({ loggedIn: false });
  }
}
