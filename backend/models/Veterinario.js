import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generarId from "../helpers/generarId.js";

const veterinarioSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        trim: true
    },
    password:{
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    telefono: {
        type: String,
        default: null,
        trim: true
    },
    web: {
        type: String,
        default: null
    },
    token:{
        type: String,
        default: generarId()
    },
    confirmado:{
        type: Boolean,
        default:false,
    },
});

// hash de password
veterinarioSchema.pre("save", async function(next) {
    if (!this.isModified("password")) { /* este if cumple la funcion de ignorar un password que ya este hasheado, si el usuario quiere cmabiar datos de cuenta al password lo va a ignorar osea no lo va a volver a hashear */
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
});

// comprobar password ya hasheado
veterinarioSchema.methods.comprobarPassword = async function(passForm) {
    return await bcrypt.compare(passForm, this.password)
}

const Veterinario = mongoose.model("Veterinario", veterinarioSchema); /* "Veterinario es la collecion de la base de datos "apv" donde se guardaran los datos(mongoose hara plural y con minisculas simpre el nombre de las colecciones)" */
export default Veterinario;