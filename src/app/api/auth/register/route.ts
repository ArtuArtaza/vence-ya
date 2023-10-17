import { register } from "@/lib/api/auth/register";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { status, ...res } = await register(body);
  return NextResponse.json(res, { status });
}
