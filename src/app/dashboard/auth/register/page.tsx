"use client"

import { useForm } from "react-hook-form";

function Registro()
{
  const {register, handleSubmit, 
    formState:{errors} 
  } = useForm();

    return( 
      <form onSubmit={handleSubmit((data)=>{
        console.log(data)
      })}>

        (
            <body className="bg-gray-100">
                <div className="bg-[#F9FAFB] h-screen w-screen flex items-center"> 
              <div className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-6 text-center">Registrarse</h1>
                <form className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">
                      Nombre y apellido
                    </label>
                    <input
                      className="input input-bordered input-primary w-full max-w-xs"
                      type="text"
                      id="fullname"
                      placeholder="Juan Perez"
                      {...register("fullname", {
                        required: true,
                        maxLength: 30
                      })}
                    />
                    {
                      errors.fullname && <span className="flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700" color="red" role="alert" >
                        El nombre y apellido es un campo requerido </span>
                    }
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="input input-bordered input-primary w-full max-w-xs"
                      type="email"
                      id="email"
                      placeholder="juanperez@example.com"
                      {...register("email",{
                        required: true
                      })}
                    />
                    {
                      errors.email && <span className="flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700" color="red" role="alert" >
                        El correo es un campo requerido </span>
                    }
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Calle
                    </label>
                    <input
                      className="input input-bordered input-primary w-full max-w-xs"
                      type="text"
                      id="street"
                      placeholder="Pelagio B. Luna"
                      {...register("street",{
                        required: true
                      })}
                    />
                    {
                      errors.street && <span className="flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700" color="red" role="alert" >
                        La calle es un campo requerido </span>
                    }
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="number">
                      Altura
                    </label>
                    <input
                      className="input input-bordered input-primary w-full max-w-xs"
                      type="number"
                      id="alt"
                      placeholder="1220"
                      {...register("number",{
                        required: true
                      })}
                    />
                    {
                      errors.number && <span className="flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700" color="red" role="alert" >
                        La altura de la calle es un campo requerido </span>
                    }
                  </div>
                  <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="number">
                      Puedes buscar aqui tu local:
                    </label>
                  </div>
                  
                
                  <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d55605.813126245026!2d-66.85174388220773!3d-29.418175859926162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1696477022816!5m2!1ses!2sar" width="315" height="200" className="my-2" ></iframe>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Contraseña
                    </label>
                    <input
                      className="input input-bordered input-primary w-full max-w-xs"
                      type="password"
                      id="password"
                      placeholder="********"
                      {...register("password",{
                        required: true,
                        minLength: 6,
                        maxLength: 15
                      })}
                    />
                    {
                      errors.password?.type === "required" && <span className="flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700" color="red" role="alert" >
                        La contraseña es un campo requerido </span>
                    }
                    {
                      errors.password?.type == "minLength" && <span className="flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700" color="red" role="alert" >
                        La contraseña debe tener al menos 6 caracteres </span>
                    }

                   
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm">
                      Repetir contraseña
                    </label>
                    <input
                      className="input input-bordered input-primary w-full max-w-xs"
                      type="password"
                      id="confirm-password"
                      placeholder="********"
                      {...register("confirm",{
                        required: true
                      })}
                    />
                    {
                      errors.confirm && <span className="flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700" color="red" role="alert" >
                        Repetir contraseña </span>
                    }
                  </div>
                  <button
                    className="w-full max-w-xs mt-5 btn btn-outline btn-info"
                    type="submit">
                    Registrarse
                  </button>
                </form>
              </div>
              </div>
            </body>
          )
          </form>
          )
        }

export default Registro