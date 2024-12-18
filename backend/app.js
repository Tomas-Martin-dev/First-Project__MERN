import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();

const PORT =  process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`servidor conectado en el puerto ${PORT}`);
});

app.use("/api/veterinario", veterinarioRoutes)

// funcion para conectar la DB
conectarDB();
