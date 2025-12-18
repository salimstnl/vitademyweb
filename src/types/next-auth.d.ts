// next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    username?: string | null;
    email?: string | null;
    role?: string | null;
    name?: string | null;
  }

  interface Session {
    user: {
      id: string;
      username?: string | null;
      email?: string | null;
      role?: string | null;
      name?: string | null;
      token?: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username?: string | null;
    email?: string | null;
    role?: string | null;
    name?: string | null;
  }
}
