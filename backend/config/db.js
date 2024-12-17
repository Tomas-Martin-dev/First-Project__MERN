import mongoose from "mongoose";

const conectarDB = async ()=> {
    try {
        const db = await mongoose.connect("mongodb+srv://MERN:locodeloco123@mern.tpiuw.mongodb.net/?retryWrites=true&w=majority&appName=MERN");
        const url =  `${db.connection.host}:${db.connection.port}`
        console.log(`MongoDB conectado en, ${url}`);
    } catch (error) {
        console.log("ERROR al conectar DB",error);
        process.exit(1);
    }
}

export default conectarDB