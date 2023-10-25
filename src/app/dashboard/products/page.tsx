import { AddProductModal } from "@/components/add-product-modal/add-product-modal";
import ProductTable from "@/components/product-table/product-table";
import { PrismaClientSingleton } from "@/lib/api/db/prisma";
import { cookies } from "next/headers";
import { Suspense } from "react";

const prisma = PrismaClientSingleton.getInstance();
const Products = async () => {
  const cookieStore = cookies();
  const userInformation = JSON.parse(cookieStore.get("user")?.value || "{}");
  console.log();
  const cookieRequest = console.log(cookieStore.getAll());
  console.log({ userInformation, cookieRequest });
  const products = await prisma.products.findMany({
    where: {
      userId: userInformation.id,
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
