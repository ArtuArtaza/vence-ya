import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaClientSingleton } from "../db/prisma";
import { genSalt, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

interface RegisterDTO {
  email: string;
  username: string;
  password: string;
  location: {
    address: string;
    addressNumber: number;
    neighborhood: string;
  };
}

const prisma = PrismaClientSingleton.getInstance();
export const register = async ({
  email,
  username,
  password,
  location,
}: RegisterDTO) => {
  try {
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    const createdUser = await prisma.users.create({
      data: { email, password: hashedPassword, username, isApproved: false },
      select: { email: true },
    });
    const token = sign(
      { email: createdUser.email },
      process.env.JWT_SECRET as string
    );
    return { message: "User created", token: token, success: true };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return {
        message: "User cannot be created",
        success: false,
        reason: error.cause,
      };
    }
    return { message: "User cannot be created", success: false, reason: null };
  }
};
