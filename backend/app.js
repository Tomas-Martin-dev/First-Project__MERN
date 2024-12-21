import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";

const app = express(); /* inicializa en una variable a Express */
app.use(express.json()); /* Middleware que permite a la app procesar datos en formato JSON */

dotenv.config(); /* Carga las variables definidas en un archivo .env para usarlas con process.env */

const PORT =  process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`servidor conectado en el puerto ${PORT}`);
}); /* Inicia el servidor en el puerto especificado y ejecuta una función de callback cuando el servidor está listo. */

app.use("/api/veterinario", veterinarioRoutes); /* Define un middleware para manejar solicitudes que comiencen con la ruta especificada */

app.use("/api/paciente", pacienteRoutes);


// funcion para conectar la DB
conectarDB();
