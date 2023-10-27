import { PrismaClientSingleton } from "@/lib/api/db/prisma";
import { cookies } from "next/headers";

const prisma = PrismaClientSingleton.getInstance();
export default async function Users() {
  const cookieStore = cookies();
  const role = JSON.parse(cookieStore.get("user")?.value || "{}").role;
  if (role !== "ADMIN") return <div>Not allowed</div>;
  const users = await prisma.users.findMany();
  return (
    <>
      {users.map((user) => (
        <div key={user.id}>{user.fullname}</div>
      ))}
    </>
  );
}
