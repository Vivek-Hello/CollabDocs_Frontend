import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";



export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  // const publicPaths = ["/login", "/signup", "/"];


 const publicPaths = ["/login", "/signup", "/"];
const pathname = req.nextUrl.pathname;
const isPublicPath = pathname === "/" || publicPaths.some((path) => pathname.startsWith(path) && path !== "/");


  // If user is not logged in & trying to access protected route
  if (!token && !isPublicPath ) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // If user is logged in & trying to access login/signup again
if (token && isPublicPath) {
   
  // If user is already logged in, prevent them from accessing login/signup again
  const redirectUrl = new URL("/dashboard", req.url);
  return NextResponse.redirect(redirectUrl);
}


  // Otherwise allow request
  return NextResponse.next();
}

// Define paths the middleware should run on
export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
