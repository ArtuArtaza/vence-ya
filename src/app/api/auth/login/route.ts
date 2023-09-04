import { login } from "@/lib/api/auth/login";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const data = await login(body);
  return NextResponse.json(data);
}
