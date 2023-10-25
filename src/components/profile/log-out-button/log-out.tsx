"use client";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

const LogOutButton = () => {
  const router = useRouter();
  const [cookies, _, removeCookie] = useCookies(["user"]);
  const logOut = () => {
    removeCookie("user");
    return router.push("/auth/login");
  };
  return <button onClick={logOut}>Cerrar sesión</button>;
};

export default LogOutButton;
