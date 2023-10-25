"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
interface signIn {
  email: string;
  password: string;
}
function Login() {
  const { register, handleSubmit } = useForm<signIn>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const signIn = async (data: signIn) => {
    setIsLoading(true);
    const response = await toast.promise(
      axios.post<{ message: string; success: boolean; token?: string }>(
        "/api/auth/login",
        data
      ),
      {
        error: "Error al iniciar sesión",
        pending: "Iniciando sesión...",
        success: "Sesión iniciada",
      }
    );
    if (response.status === 200 && response.data.success)
      return router.push("/dashboard/products");
    setIsLoading(false);
  };
  return (
    <div className="bg-base-100 h-max mx-auto flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold text-center pb-10">
        Ingresar en tu cuenta
      </h1>
      <form
        onSubmit={handleSubmit(signIn)}
        className="shadow-xl p-10 flex flex-col gap-4 text-sm"
      >
        <div className="flex flex-col">
          <label
            className="text-gray-600 font-bold inline-block pb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="input input-bordered input-primary w-full max-w-xs"
            type="email"
            {...register("email")}
            placeholder="juaperez@example.com"
          />
        </div>
        <div>
          <label
            className="text-gray-600 font-bold inline-block pb-2"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            className="input input-bordered input-primary w-full max-w-xs"
            type="password"
            {...register("password")}
            placeholder="******"
          />
        </div>
        <div className="flex">
          <div className="w-1/2">
            <input type="checkbox" name="remeberMe" />
            <label className="m-2" htmlFor="remeberMe">
              Recordarme
            </label>
          </div>
        </div>
        <div>
          <button
            className="w-full max-w-xs btn btn-outline btn-info"
            type="submit"
          >
            Iniciar sesión
          </button>
        </div>
        <span className="flex items-center gap-5 justify-center">
          <hr className="w-full" />
          o
          <hr className="w-full" />
        </span>
        <a href="register" className="text-center">
          Crea una cuenta nueva
        </a>
      </form>
    </div>
  );
}
export default Login;
