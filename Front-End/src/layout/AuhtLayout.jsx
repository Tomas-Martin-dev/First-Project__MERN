import { Outlet } from "react-router-dom";

const AuhtLayout = () => {
  return (
    <>
        <h1>Desde Auth Layout</h1>
        <Outlet />
    </>
  )
}

export default AuhtLayout;