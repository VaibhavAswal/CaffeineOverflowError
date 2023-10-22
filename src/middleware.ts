import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  const onlyPublicPaths = ["/login", "/register"];
  const protectedPaths = ["/", "/profile", "/account/verify"];

  const token = request.cookies.get("token")?.value || "";

  if (onlyPublicPaths.includes(currentPath) && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (protectedPaths.includes(currentPath) && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/register", "/account/verify"],
};
