import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
// Definimos la instancia de nuestro express router
const authRouter = Router();
// Se define la base de la URI para exponer el servicio
const baseURI = "/auth";
// Se generan los recursos a exponer (login)
// login es para obtener un token para iniciar sesión
authRouter.post(`${baseURI}/login`, login);
export default authRouter;
