import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Alerta from "../componentes/Alerta"
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [alerta, setAlerta] = useState("");
  const {auth, setAuth} = useAuth();
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");

  const navigation = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault();

    if ([contraseña, email].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      return
    }
    if (contraseña.length < 6) {
      setAlerta({ msg: "La contraseña debe tener 6 caracteres de minimo", error: true });
      return
    }
    setAlerta({})
    
    try {
      const {data} = await clienteAxios.post("/veterinario/login", {email,contraseña})
      localStorage.setItem("token", data.token);
      setAuth(data);
      navigation("/admin");
    } 
    catch (error) {
      console.log(error);
      setAlerta({msg: error.response.data.msg, error: true})
    }
  }

  const { msg } = alerta;
  return (
    <>
      <div className="md:flex justify-center hidden ">
        <img
          src="../public/vite.svg"
          alt="logo"
          className=""
        />
      </div>

      <div className="bg-white mx-2 lg:mx-8 px-4 lg:px-32 py-10 rounded-lg shadow-xl flex flex-col">

        <h1 className="text-indigo-600 text-4xl font-bold text-center">
        Inicia Sesión
        </h1>

        <h3 className="text-gray-600 text-2xl font-normal text-center mt-3">Administra tus Pacientes</h3>

        <div className=" ">

        <form action="" className=" flex flex-col gap-6 px-5" onSubmit={handleSubmit}>

        {msg && <Alerta
          alerta={alerta}
        />}

          <div>
            <label className=" uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
              value={contraseña}
              onChange={e => setContraseña(e.target.value)}
              placeholder="Ingrese su Contraseña"
              className="border w-full p-3 mt-1 bg-gray-50 rounded-xl"
            />
          </div>

          <input
            type="submit"
            value="Ingresar"
            className="w-full mx-auto bg-indigo-600 text-white border rounded-xl py-2 px-12 uppercase hover:bg-indigo-700 hover:cursor-pointer"
          />

        </form>

        <nav className="lg:flex lg:justify-between px-5 mt-3">
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
      
      </div>
    </>
  )
}

export default Login