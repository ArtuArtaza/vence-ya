function Login() {
  return (
    
    <div className="bg-[#F9FAFB] h-screen w-screen flex items-center">
         
      <div className="h-max mx-auto flex flex-col items-center">
        <h1 className="text-xl font-bold text-center pb-10">
          Ingresar en tu cuenta
        </h1>
        <div className="bg-white shadow-xl p-10 flex flex-col gap-4 text-sm">
          <div>
            <label
              className="text-gray-600 font-bold inline-block pb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="input input-bordered input-primary w-full max-w-xs"
              type="email"
              name="email"
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
              name="password"
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
            <input
              className="w-full max-w-xs btn btn-outline btn-info"
              type="submit"
              value="Iniciar sesión"
            />
          </div>
         
        </div>
      </div>
    </div>
  );
}
export default Login;
