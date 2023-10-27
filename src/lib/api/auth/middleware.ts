import { NextRequest, NextResponse } from "next/server";
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
  const loginPath = request.nextUrl.clone();

  loginPath.pathname = "/auth/login";
  if (!token) return NextResponse.redirect(loginPath);
  const userInformation = (await jwtVerify(
    token.value,
    new TextEncoder().encode(process.env.JWT_SECRET as string),
    {
      algorithms: ["HS256"],
    }
  )) as any;
  if (
    userInformation.payload.role !== "ADMIN" &&
    request.nextUrl.pathname === "/dashboard/users"
  ) {
    const errorPath = request.nextUrl.clone();
    errorPath.pathname = "/dashboard/error";
    const response = NextResponse.redirect(errorPath);
    return response;
  }
  const response = NextResponse.next();
  const {
    payload: { id, email, role },
  } = userInformation;
  console.log(userInformation);
  response.cookies.set("user", JSON.stringify({ id, email, role }));
  return response;
};
