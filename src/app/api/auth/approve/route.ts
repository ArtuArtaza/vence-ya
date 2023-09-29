import { approve } from "@/lib/api/auth/approve";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const data = await approve(body);
  return NextResponse.json(data);
}
