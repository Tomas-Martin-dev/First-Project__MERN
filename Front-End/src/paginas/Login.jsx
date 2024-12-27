import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
        <div className="md:flex justify-center hidden ">
          <img 
            src="../public/vite.svg" 
            alt="logo"
            className="" 
          />
        </div>
        
        <div className="bg-white mx-2 lg:mx-8 px-4 lg:px-8 py-10 rounded-lg shadow-xl">
          
          <h1 className="text-cyan-600 text-4xl font-bold text-center">
            Inicia Sesión y Administra tus
            <span className="text-gray-600"> Pacientes</span>
          </h1>

          <form action="" className=" flex flex-col gap-5 mt-7">
            
            <div>
              <label className=" uppercase text-gray-600 block text-xl font-bold">
                Email
              </label>
              <input 
              type="text" 
              placeholder="Ingrese su Email"
              className="border w-full p-3 mt-1 bg-gray-50 rounded-xl" 
              />
            </div>
            
            <div>
              <label className=" uppercase text-gray-600 block text-xl font-bold">
                Contraseña
              </label>
              <input 
              type="password" 
              placeholder="Ingrese su Contraseña"
              className="border w-full p-3 mt-1 bg-gray-50 rounded-xl" 
              />
            </div>
            
            <input 
              type="submit" 
              value="Ingresar"
              className="w-full md:max-w-72 mx-auto bg-indigo-600 text-white border rounded-xl py-2 px-12 uppercase hover:bg-indigo-700 hover:cursor-pointer" 
            />

          </form>

          <nav className="mt-12 lg:flex lg:justify-between">
            <Link 
              to="/registrar"
              className="my-1 block text-center text-gray-500 hover:text-gray-600"
              >¿No tienes Cuenta? Registrate
            </Link>
            <Link 
              to="/recuperar-password"
              className="my-1 block text-center text-gray-500 hover:text-gray-600"
              >¿Olvidaste tu Contraseña?
            </Link>
          </nav>
        </div>
    </>
  )
}

export default Login