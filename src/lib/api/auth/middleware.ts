import { NextRequest, NextResponse } from "next/server";
import { JwtPayload, verify } from "jsonwebtoken";
import { jwtVerify } from "jose";
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
  const dest = request.nextUrl.clone();
  dest.pathname = "/auth/login";
  if (!token) return NextResponse.redirect(dest);
  const userInformation = await jwtVerify(
    token.value,
    new TextEncoder().encode(process.env.JWT_SECRET as string),
    {
      algorithms: ["HS256"],
    }
  );
  console.log(userInformation);
  //const role = (userInformation as JwtPayload).role;
  return NextResponse.next();
};
