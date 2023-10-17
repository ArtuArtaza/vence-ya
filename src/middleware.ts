import { NextRequest, NextResponse } from "next/server";
import {
  checkRouteType,
  privateRoutesMiddlewares,
} from "./lib/api/auth/middleware";

export function middleware(request: NextRequest) {
  const routeType = checkRouteType(request);
  if (routeType === "private") {
    return privateRoutesMiddlewares(request);
  }
}

export const config = {
  matcher: "/dashboard/:path*",
};
