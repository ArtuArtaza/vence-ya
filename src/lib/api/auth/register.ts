import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaClientSingleton } from "../db/prisma";
import { genSalt, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

interface RegisterDTO {
  email: string;
  password: string;
  fullname: string;
  location: {
    address: string;
    addressNumber: number;
    neighborhood: string;
  };
}

const prisma = PrismaClientSingleton.getInstance();
export const register = async ({
  email,
  fullname,
  password,
  location,
}: RegisterDTO) => {
  try {
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    const createdUser = await prisma.users.create({
      data: { email, password: hashedPassword, fullname, isApproved: false },
      select: { email: true, role: true, id: true },
    });
    const token = await new SignJWT({
      email: createdUser.email,
      role: createdUser.role,
      id: createdUser.id,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setIssuer("https://example.com")
      .setAudience("https://example.com")
      .setExpirationTime("2h")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET as string));

    const cookieStore = cookies();
    cookieStore.set("token", token);
    return {
      message: "User created",
      token: token,
      success: true,
      status: 200,
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return {
        message: "User cannot be created",
        success: false,
        reason: error.cause,
        status: 404,
      };
    }
    return {
      message: "User cannot be created",
      success: false,
      reason: null,
      error: error,
      status: 404,
    };
  }
};
