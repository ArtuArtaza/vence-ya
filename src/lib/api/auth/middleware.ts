import { NextRequest, NextResponse } from "next/server";
import { JwtPayload, verify } from "jsonwebtoken";
const privateRoutes = ["dashboard"];
export const checkRouteType = (request: NextRequest): "private" | "public" => {
  if (
    privateRoutes.some((val) => val === request.nextUrl.pathname.split("/")[1])
  ) {
    return "private";
  }
  return "public";
};

export const privateRoutesMiddlewares = async (request: NextRequest) => {
  const cookies = request.cookies;
  const token = cookies.get("token");
  if (!token) return NextResponse.redirect("/auth/login");
  const userInformation = verify(token.value, process.env.JWT_SECRET as string);
  const role = (userInformation as JwtPayload).role;
  return NextResponse.next();
};
