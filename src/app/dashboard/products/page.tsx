import { AddProductModal } from "@/components/add-product-modal/add-product-modal";
//import ProductTable from "@/components/product-table/product-table";
import { PrismaClientSingleton } from "@/lib/api/db/prisma";
import { cookies } from "next/headers";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const ProductTable = dynamic(
  () => import("@/components/product-table/product-table"),
  { ssr: false }
);

export const revalidate = true;
const prisma = PrismaClientSingleton.getInstance();
const Products = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const cookieStore = cookies();
  const userInformation = JSON.parse(cookieStore.get("user")?.value || "{}");
  const filterObject =
    userInformation.role === "ADMIN"
      ? {
          ...(searchParams &&
            searchParams.search && {
              name: searchParams.search as string,
            }),
        }
      : {
          userId: userInformation.id,
          ...(searchParams &&
            searchParams.search && {
              name: searchParams.search as string,
            }),
        };
  const products = await prisma.products.findMany({
    where: filterObject,
  });
  return (
    <div className="w-full flex items-center justify-center bg-base-100">
      <Suspense
        fallback={<span className="loading loading-spinner loading-lg"></span>}
      >
        <ProductTable products={products} />
      </Suspense>
    </div>
  );
};

export default Products;
