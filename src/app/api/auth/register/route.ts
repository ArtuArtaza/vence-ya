import { register } from "@/lib/api/auth/register";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  const data = await register(body);
  return NextResponse.json(data);
}
