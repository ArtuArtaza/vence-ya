import { createProduct } from "@/lib/api/products/createProduct";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const response = await createProduct(request);
  if (response.status) {
    revalidatePath("/dashboard/products");
    return response;
  }
  return response;
};
