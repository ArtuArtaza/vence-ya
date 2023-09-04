import { compare } from "bcrypt";
import { PrismaClientSingleton } from "../db/prisma";
import { sign } from "jsonwebtoken";
interface LoginDTO {
  emailOrUsername: string;
  password: string;
}
const prisma = PrismaClientSingleton.getInstance();
export const login = async ({ emailOrUsername, password }: LoginDTO) => {
  try {
    console.log(emailOrUsername);
    const filter = emailOrUsername.includes("@")
      ? { email: emailOrUsername }
      : { username: emailOrUsername };
    const user = await prisma.users.findFirst({
      where: filter,
      select: { password: true, email: true },
    });
    if (!user) {
      return { message: "Email o contraseña incorrectos", success: false };
    }
    const arePasswordTheSame = await compare(password, user.password);
    if (!arePasswordTheSame) {
      return { message: "Email o contraseña incorrectos", success: false };
    }
    const token = sign({ email: user.email }, process.env.JWT_SECRET as string);
    return {
      message: "Usuario obtenido con éxito",
      token: token,
      success: true,
    };
  } catch (error) {
    console.log(error);
  }
};
