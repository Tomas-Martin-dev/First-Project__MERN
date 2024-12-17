import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";

const app = express();
dotenv.config()

const PORT =  process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(`servidor conectado en el puerto ${PORT}`);
});

app.use("/", (req,res)=>{
    res.send("Hola Mundoooo")
})

// funcion para conectar la DB
conectarDB();

