import { AddProductModal } from "@/components/add-product-modal/add-product-modal";
import ProductTable from "@/components/product-table/product-table";
import { PrismaClientSingleton } from "@/lib/api/db/prisma";
import { cookies } from "next/headers";
import { Suspense } from "react";

export const revalidate = true;
const prisma = PrismaClientSingleton.getInstance();
const Products = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const cookieStore = cookies();
  const userInformation = JSON.parse(cookieStore.get("user")?.value || "{}");
  const cookieRequest = console.log(cookieStore.getAll());
  const products = await prisma.products.findMany({
    where: {
      userId: userInformation.id,
      ...(searchParams &&
        searchParams.search && {
          name: searchParams.search as string,
        }),
    },
  });
  return (
    <section className="w-full flex items-center justify-center bg-base-100">
      <Suspense fallback={<div className="">isLoading</div>}>
        <ProductTable products={products} />
      </Suspense>
    </section>
  );
};

export default Products;
