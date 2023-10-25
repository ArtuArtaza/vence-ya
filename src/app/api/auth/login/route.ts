import { login } from "@/lib/api/auth/login";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = await login(body);
  return response;
}
