import { PrismaClientSingleton } from "../db/prisma";
interface ApproveDTO {
  userToApproveId: string;
}
const prisma = PrismaClientSingleton.getInstance();
export const approve = async ({ userToApproveId }: ApproveDTO) => {
  try {
    const user = await prisma.users.update({
      where: { id: userToApproveId },
      data: {
        isApproved: true,
      },
    });
    if (!user) {
      return {
        message: "El usuario no existe",
        status: 404,
      };
    }
    return {
      message: "Usuario aprobado exitosamente",
      status: 200,
      success: true,
    };
  } catch (error) {
    return {
      message: "El usuario no puede ser aprobado",
      status: 400,
    };
  }
};
