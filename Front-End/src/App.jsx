import { BrowserRouter, Routes, Route} from "react-router-dom"
import AuthLayout from "./layout/AuhtLayout";
import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import OlvidePassword from "./paginas/OlvidePassword";
import NuevoPassword from "./paginas/nuevoPassword";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="registrar" element={< Registrar />} />
          <Route path="confirmar-cuenta/:id" element={< ConfirmarCuenta />} />
          <Route path="recuperar-password" element={< OlvidePassword />} />
          <Route path="recuperar-password/:token" element={< NuevoPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
