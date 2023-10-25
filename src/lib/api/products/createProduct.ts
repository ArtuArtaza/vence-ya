import { NextRequest, NextResponse } from "next/server";
import { PrismaClientSingleton } from "../db/prisma";
import { revalidatePath } from "next/cache";

const prisma = PrismaClientSingleton.getInstance();
export const createProduct = async (request: NextRequest) => {
  const { ...rest } = await request.json();
  const userId = JSON.parse(request.cookies.get("user")?.value as string).id;
  console.log(userId);
  try {
    const product = await prisma.products.create({
      data: {
        ...rest,
        imgSrc: rest.imgSrc || "https://via.placeholder.com/150",
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    if (!product)
      return NextResponse.json(
        {
          message: "No se pudo crear el producto",
          success: false,
          product: undefined,
        },
        { status: 400 }
      );
    revalidatePath("/dashboard/products");
    return NextResponse.json(
      {
        message: "Producto creado con éxito",
        success: true,
        product,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "No se ha podido crear un producto",
        success: false,
        product: undefined,
      },
      { status: 400 }
    );
  }
};
