import { getProductsByBarCode } from "@/lib/api/products/getProductsByBarCode";
import { Router } from "@/lib/api/router/router";
import { NextResponse } from "next/server";

const router = new Router();
export const GET = (request: Request) => {
  router.get("/dashboard/products", () => getProductsByBarCode(request));
  const p = router.findRoute(request);
  console.log(p);
  if (p) {
    p(request);
    return NextResponse.json({ elpepe: "" });
  }
  return NextResponse.json({ elpepe: "" });
};
export const POST = (request: Request) => {
  router.post("/dashboard/products", () => getProductsByBarCode(request));
  const p = router.findRoute(request);
  NextResponse.json({ elpepe: "" });
  if (p) {
    p(request);
    NextResponse.json({ elpepe: "" });
  }
  NextResponse.json({ elpepe: "" });
};
