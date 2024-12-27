import { Outlet, useLocation,useParams } from "react-router-dom";

const AuhtLayout = () => {
  const location = useLocation();
  const isRecoverPageRecuperarP = location.pathname.endsWith("/recuperar-password");
  const isRecoverPageRegistrar = location.pathname.endsWith("/registrar");
  
  const params = useParams();
  const { id } = params;

  let mainClasses;
  if (isRecoverPageRecuperarP) {
    mainClasses = "min-w-full container grid grid-cols-1 py-12 px-5";
  }
  else if (isRecoverPageRegistrar) {
    mainClasses = "min-w-full md:max-h-screen container grid grid-cols-1 md:grid-cols-2 py-16 gap-10 px-5 md:px-12";
  }
  else if (location.pathname.includes(id)) {
    mainClasses = "min-w-full container grid grid-cols-1 py-12 px-5";    
  }
  else{
    mainClasses = "min-w-full min-h-screen container grid grid-cols-1 md:grid-cols-2 py-28 gap-10 px-5 md:px-12";
  }

  return (
    <>
        <main className={mainClasses}>
          <Outlet />
        </main>
    </>
  )
}

export default AuhtLayout;