 function Login(){
    return (
        
<div className="bg-[#F9FAFB] h-screen w-screen flex items-center">
        <div className="h-max mx-auto flex flex-col items-center">
            <h1 className="text-xl font-bold text-center pb-10">Ingresar en tu cuenta</h1>
            <div className="bg-white shadow-xl p-10 flex flex-col gap-4 text-sm">
                <div>
                    <label className="text-gray-600 font-bold inline-block pb-2" htmlFor="email">Email</label>
                    <input className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2" type="email" name="email" placeholder="juaperez@example.com"/>
                </div>
                <div>
                    <label className="text-gray-600 font-bold inline-block pb-2" htmlFor="password">Contraseña</label>
                    <input className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2" type="password" name="password" placeholder="******"/>
                </div>
                <div className="flex">
                    <div className="w-1/2">
                        <input type="checkbox" name="remeberMe"/>
                        <label htmlFor="remeberMe"  >Recordarme</label>
                    </div>
                    
                </div>
                <div>
                    <input className="bg-[#4F46E5] w-full py-2 rounded-md text-white font-bold cursor-pointer hover:bg-[#181196]" type="submit" value="Iniciar sesión" />
                </div>
                
               
            </div>
           
        </div>
    </div>
    )
}
export default Login