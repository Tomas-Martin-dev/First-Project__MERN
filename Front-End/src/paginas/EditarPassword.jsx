import AdminNav from "../componentes/AdminNav"

const EditarPassword = () => {
    return (
        <>
            <AdminNav/>

            <h2 className=" font-bold text-3xl text-center mt-10">Editar Contraseña</h2>
            <p className=" text-xl mt-5 mb-10 text-center">Modifica tu {""} 
                <span className="text-indigo-600 font-bold">Contraseña Aqui</span>
            </p>
        
        </>
    )
}

export default EditarPassword