import { NextRequest, NextResponse } from "next/server";
import {
  checkRouteType,
  privateRoutesMiddlewares,
} from "@/lib/api/auth/middleware";

export function middleware(request: NextRequest) {
  const routeType = checkRouteType(request);
  if (routeType === "private") {
    return privateRoutesMiddlewares(request);
  }
  console.log(request.cookies.getAll());
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
