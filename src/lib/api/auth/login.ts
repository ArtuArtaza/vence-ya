import { compare } from "bcrypt";
import { PrismaClientSingleton } from "../db/prisma";
import { sign } from "jsonwebtoken";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
interface LoginDTO {
  email: string;
  password: string;
}
const prisma = PrismaClientSingleton.getInstance();
export const login = async ({ email, password }: LoginDTO) => {
  try {
    console.log(email, password);
    const user = await prisma.users.findFirst({
      where: {
        email: email,
      },
      select: { password: true, email: true, role: true, id: true },
    });

    console.log(user);
    if (!user) {
      return NextResponse.json(
        {
          message: "Email o contraseña incorrectos",
          success: false,
        },
        { status: 400, statusText: "Bad Request" }
      );
    }
    console.log(password, user.password);
    const arePasswordTheSame = await compare(password, user.password);
    if (!arePasswordTheSame) {
      return NextResponse.json(
        {
          message: "Email o contraseña incorrectos",
          success: false,
        },
        { status: 400, statusText: "Bad Request" }
      );
    }
    const token = await new SignJWT({
      email: user.email,
      role: user.role,
      id: user.id,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setIssuer("https://example.com")
      .setAudience("https://example.com")
      .setExpirationTime("2h")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET as string));

    const cookieStore = cookies();
    cookieStore.set("token", token);
    return NextResponse.json(
      {
        message: "Usuario obtenido con éxito",
        token: token,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "error",
        status: 400,
      },
      { status: 400 }
    );
  }
};
