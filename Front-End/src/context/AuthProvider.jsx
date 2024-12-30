import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

const AuhtContext = createContext();

const AuhtProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [cargandoAuht, setCargandoAuth] = useState(true);

    useEffect(() => {
        const autenticarUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setCargandoAuth(false)
                return
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await clienteAxios("veterinario/perfil", config);
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({})
            }
            setCargandoAuth(false)
        }
        autenticarUser()
    }, [])

    const cerrarSession = ()=>{
        localStorage.removeItem("token");
        setAuth({});
    }

    return (
        <AuhtContext.Provider
            value={{
                auth,
                setAuth,
                cargandoAuht,
                cerrarSession
            }}
        >
            {children}
        </AuhtContext.Provider>
    )
}

export {
    AuhtProvider
}

export default AuhtContext