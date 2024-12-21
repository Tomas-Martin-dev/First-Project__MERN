import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generar-JWT.js";
import generarID from "../helpers/generarId.js";

const registrar = async (req,res) =>{
    const { email, password, nombre } = req.body; 

    // prevenir users duplicados
    const existeUser =  await Veterinario.findOne({email})
    if (existeUser) {
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({msg: error.message })        
    }

    try {
        // Guardar un nuevo Veterinario
        const veterinario = new Veterinario(req.body);
        const veterinarioOK = await veterinario.save();
        res.json(veterinarioOK)
        console.log("NUEVO VETE ALMACENADO EN LA DB");
    } catch (error) {
        console.log(error);
    }
};

const perfil = (req,res)=> {
    const {veterinario} = req
    
    res.send({ perfil : veterinario})
};

const confirmar = async (req,res)=> {
    const { token } = req.params;
    const usuarioConfirmar = await Veterinario.findOne({token});
    
    if (!usuarioConfirmar) {
        const error = new Error("Token no valido");
        return res.status(404).json({msg : error.message});
    }

    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();
        res.send({msg: "User confirmado"})
    } catch (error) {
        console.log(error);
    }
};

const autenticar = async (req,res)=> {
    const {email, password} = req.body;
    
    // Verificar que el user existe
    const usuario = await Veterinario.findOne({email});
    if (!usuario) {
        const error = new Error("El usuario no existe");
        return  res.status(403).json({msg: error.message});
    }

    // Verificar si el user esta confirmado 
    if(!usuario.confirmado){
        const error = new Error("El usuario no esta confirmado");
        return  res.status(403).json({msg: error.message});
    }

    // Verificar que el password esta bien
    if (await usuario.comprobarPassword(password)) {
        console.log("pass correcto!!");
        // Autenticado el user creamos un jsonWebToken
        res.json( {token: generarJWT(usuario.id)} )
    }else{
        const error = new Error("El password es incorrecto");
        return  res.status(403).json({msg: error.message});
    }

};

const resetPassword =  async (req,res)=> {
    const {email} = req.body;
    const userExistente = await Veterinario.findOne({email});

    if (!userExistente) {
        const error = new Error("El Email o Usuario es incorrecto");
        return  res.status(400).json({msg: error.message});
    }

    try {
        userExistente.token =  generarID();
        await userExistente.save(); /* generamos un token nuevo, lo guardamos en la DB para luego enviarlo por correo */
        res.json({msg: "Te enviamos un email con las instrucciones para recuperar tu password"}) 
        
    } catch (error) {
        console.log(error);
    }
}

const comprobarToken =  async (req,res)=> {
    const { token } = req.params;
    const userExistente = await Veterinario.findOne({token});
    
    if (!userExistente) {
        const error = new Error("Token no valido");
        return res.status(404).json({msg : error.message});
    }else{
        res.json({msg: "Token Correcto"})
        console.log(userExistente);
    }
    
    
}

const modificarPassword =  async (req,res)=> {
    const {token} = req.params;
    const {password} = req.body;
    const veterinario = await Veterinario.findOne({token});

    if(!veterinario){
        const error = new Error("Hubo un error");
        return res.status(404).json({msg : error.message});
    }
    
    try {
        veterinario.password = password;
        veterinario.token = null;
        await veterinario.save()
        res.send({msg: "Contraseña Modificada correctamente"})        
    } catch (error) {
        console.log(error);
    }
}

export {
    registrar,
    perfil,
    confirmar,
    autenticar, 
    resetPassword,
    comprobarToken,
    modificarPassword
}