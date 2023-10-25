import { createProduct } from "@/lib/api/products/createProduct";
import { getProductsByBarCode } from "@/lib/api/products/getProductsByBarCode";
import { Router } from "@/lib/api/router/router";
import { NextRequest, NextResponse } from "next/server";

const router = new Router();
export const GET = (request: NextRequest) => {
  router.get("/dashboard/products", () => getProductsByBarCode(request));
  const p = router.findRoute(request);
  console.log(p);
  if (p) {
    p(request);
    return NextResponse.json({ elpepe: "" });
  }
  return NextResponse.json({ elpepe: "" });
};
export const POST = (request: NextRequest) => {
  router.post("/dashboard/products", () => getProductsByBarCode(request));
  router.post("/dashboard/create-product", () => createProduct(request));
  const p = router.findRoute(request);
  return p;
};
