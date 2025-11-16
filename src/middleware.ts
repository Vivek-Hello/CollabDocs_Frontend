import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const pathname = req.nextUrl.pathname;

  // Only these 3 are public — exact matches
  const publicPaths = ["/", "/login", "/signup"];
  const isPublicPath = publicPaths.includes(pathname);

  // 1️⃣ Not logged in → restrict all private routes
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2️⃣ Logged in → block ONLY login/signup pages
  if (token && (pathname === "/login" || pathname === "/signup" || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 3️⃣ Everything else allowed
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
