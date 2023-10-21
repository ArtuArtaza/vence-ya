"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface DefaultFormValues {
  fullname: string;
  email: string;
  street: string;
  number: string;
  password: string;
  confirmPassword: string;
}
function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DefaultFormValues>();
  const router = useRouter();
  const formState = watch();
  const handleOnSubmit = async (formData: DefaultFormValues) => {
    const response = await toast.promise(
      fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
      }),
      {
        pending: "Creando cuenta...",
        success: "Registro exitoso",
        error: "Error al registrarse",
      }
    );
    if (response.status === 200) {
      return router.push("/dashboard/products");
    }
  };
  return (
    <div className=" bg-base-300 flex items-center">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Registrarse</h1>
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="w-full grid max-w-sm mx-auto bg-base-100  p-8 rounded-md shadow-md"
        >
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="fullname"
            >
              Nombre y apellido
            </label>
            <input
              className="input input-bordered input-primary w-full max-w-xs"
              type="text"
              id="fullname"
              placeholder="Juan Perez"
              {...register("fullname", {
                required: true,
                maxLength: 30,
              })}
            />
            {errors.fullname && (
              <span
                className="flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700"
                color="red"
                role="alert"
              >
                El nombre y apellido es un campo requerido{" "}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="input input-bordered input-primary w-full max-w-xs"
              type="email"
              id="email"
              placeholder="juanperez@example.com"
              {...register("email", {
                required: true,
              })}
            />
            {errors.email && (
              <span
                className="flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700"
                color="red"
                role="alert"
              >
                El correo es un campo requerido{" "}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Calle
            </label>
            <input
              className="input input-bordered input-primary w-full max-w-xs"
              type="text"
              id="street"
              placeholder="Pelagio B. Luna"
              {...register("street", {
                required: true,
              })}
            />
            {errors.street && (
              <span
                className="flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700"
                color="red"
                role="alert"
              >
                La calle es un campo requerido{" "}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="number"
            >
              Altura
            </label>
            <input
              className="input input-bordered input-primary w-full max-w-xs"
              type="number"
              id="alt"
              placeholder="1220"
              {...register("number", {
                required: true,
              })}
            />
            {errors.number && (
              <span
                className="flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700"
                color="red"
                role="alert"
              >
                La altura de la calle es un campo requerido{" "}
              </span>
            )}
          </div>
          <div>
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="number"
            >
              Puedes buscar aqui tu local:
            </label>
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d55605.813126245026!2d-66.85174388220773!3d-29.418175859926162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1696477022816!5m2!1ses!2sar"
            width="315"
            height="200"
            className="my-2"
          ></iframe>

          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              className="input input-bordered input-primary w-full max-w-xs"
              type="password"
              id="password"
              placeholder="********"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 15,
              })}
            />
            {errors.password?.type === "required" && (
              <span
                className="flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700"
                color="red"
                role="alert"
              >
                La contraseña es un campo requerido{" "}
              </span>
            )}
            {errors.password?.type == "minLength" && (
              <span
                className="flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700"
                color="red"
                role="alert"
              >
                La contraseña debe tener al menos 6 caracteres{" "}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="confirm-password"
            >
              Repetir contraseña
            </label>
            <input
              className="input input-bordered input-primary w-full max-w-xs"
              type="password"
              id="confirm-password"
              placeholder="********"
              {...register("confirmPassword", {
                required: true,
                validate: (value) => value === formState.password,
              })}
            />
            {errors.confirmPassword && (
              <span
                className="flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700"
                color="red"
                role="alert"
              >
                {errors.confirmPassword.type === "required"
                  ? "Este campo es requerido"
                  : "Las contraseñas no coinciden"}
              </span>
            )}
          </div>
          <button
            className="w-full max-w-xs mt-5 btn  btn-primary"
            type="submit"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
