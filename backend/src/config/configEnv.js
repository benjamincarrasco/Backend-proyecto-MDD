"use strict";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";

//Conseguir la ruta del archivo
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const envFilePath = path.resolve(_dirname, ".env");

dotenv.config({ path: envFilePath })

//Exportar variables de entorno
export const PORT = process.env.PORT;
export const HOST = process.env.HOST;
export const DB_USERNAME = process.env.DB_USERNAME;
export const PASSWORD = process.env.PASSWORD;
export const DATABASE = process.env.DATABASE;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const EMAIL_USER = process.env.EMAIL_USER; 
export const EMAIL_PASS = process.env.EMAIL_PASS; 