import { AddProductModal } from "@/components/add-product-modal/add-product-modal";
import ProductTable from "@/components/product-table/product-table";
import { Suspense } from "react";
const Products = () => {
  return (
    <section className="w-full flex items-center justify-center bg-base-100">
      <Suspense fallback={<div className="">isLoading</div>}>
        <ProductTable />
      </Suspense>
    </section>
  );
};

export default Products;
