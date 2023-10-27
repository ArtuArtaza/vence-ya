import { PrismaClientSingleton } from "@/lib/api/db/prisma";
import { cookies } from "next/headers";
import LogOutButton from "./log-out-button/log-out";

const prisma = PrismaClientSingleton.getInstance();

const getNameInitials = (fullname: string) => {
  const [a, b, ...rest] = fullname.split(" ");
  if (rest.length > 0) {
    return `${a.charAt(0)}${rest[rest.length - 1].charAt(0)}`;
  }
  return `${a.charAt(0)}${b ? b.charAt(0) : ""}`;
};
const Profile = async () => {
  const cookieStore = cookies();
  const userInformation = JSON.parse(cookieStore.get("user")?.value || "{}");
  console.log({ userInformation });
  const data = await prisma.users.findUnique({
    where: {
      email: userInformation.email,
    },
    select: { fullname: true },
  });
  return (
    <div className="dropdown dropdown-end">
      <button className="btn btn-circle">
        {getNameInitials(data?.fullname || "")}
      </button>

      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-52"
      >
        <li className="p-2">
          <div>
            Hola,
            <strong className="text-bold">
              {data?.fullname.split(" ")[0]}
            </strong>
          </div>
        </li>
        <li>
          <a className="/dashboard/products">Mis Productos</a>
        </li>
        <li>
          <LogOutButton />
        </li>
      </ul>
    </div>
  );
};

export default Profile;
