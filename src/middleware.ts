import { NextRequest, NextResponse } from "next/server";
import {
  checkRouteType,
  privateRoutesMiddlewares,
} from "@/lib/api/auth/middleware";

export function middleware(request: NextRequest) {
  const routeType = checkRouteType(request);
  console.log(request.cookies.getAll());
  if (request.nextUrl.pathname === "/" && !request.cookies.get("token")) {
    const url = new URL(request.nextUrl.toString());
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }
  if (routeType === "private") {
    return privateRoutesMiddlewares(request);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*", "/"],
};
