import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  const isLoggedIn = !!token;
  const pathname = request.nextUrl.pathname;

  const isProtectedPage = pathname.startsWith("/dashboard") || 
                           pathname.startsWith("/profile");
  const isAuthPage = pathname === "/login" || 
                     pathname === "/register";

  // logged out visiting protected page → redirect to login
  if (!isLoggedIn && isProtectedPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // logged in visiting auth page → redirect to dashboard
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/login", "/register"],
};