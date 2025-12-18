import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextFetchEvent } from "next/server";

const intlMiddleware = createIntlMiddleware(routing);

const adminAuthMiddleware = withAuth((req) => intlMiddleware(req), {
  callbacks: {
    authorized: ({ token }) => token?.role === "ADMIN",
  },
  pages: { signIn: "/" },
});

export function middleware(req: NextRequestWithAuth, event: NextFetchEvent) {
  const pathname = req.nextUrl.pathname;

  // Protect admin pages
  if (pathname.startsWith("/admin") || pathname.match(/^\/(en|id|jp)\/admin/)) {
    return adminAuthMiddleware(req, event);
  }

  // All other routes → locale only
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
