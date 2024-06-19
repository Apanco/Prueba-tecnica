import express from "express";
import dotenv from "dotenv"
import { conectDB } from "./config/db";
import productRouter from "./routes/productRoute";
import { corsOption } from "./config/cors";
import cors from "cors"
dotenv.config()
//. ->  Conexion a la base de datos
conectDB()

//. ->  Crear servidor
const app = express();

app.use(cors(corsOption))
//. ->  Habilitar lecturas de json}
app.use(express.json());

//. ->  Rutas

app.use("/api/products", productRouter)

export default app;