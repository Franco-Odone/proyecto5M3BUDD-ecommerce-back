import productsRouter from "./resources/products/routes/products.routes.js";
import usersRouter from "./resources/users/routes/users.routes.js";
import authRouter from "./resources/auth/routes/auth.routes.js";
import environment from "./config/environment.js";
import { startConnection } from "./config/database.config.js";
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";

// Se crea una instancia de una aplicación express
const app = express();

// Iniciamos la conexión a la base de datos al momento de levantar la app
startConnection();

// bodyparser
// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.urlencoded({ extended: true }));

// Habilitar CORS
// "Cross-Origin resource sharing", protocolo que consiste en restringir o permitir peticiones de dominios externos a la aplicación.
app.use(cors());
// Se configura un middleware para aceptar requests de tipo JSON
app.use(express.json());

// Se agregan los distintos endpoints
app.use(productsRouter);
app.use(usersRouter);
app.use(authRouter);

// Se inicia la aplicación y se queda escuchando requests en el puerto indicado
app.listen(environment.PORT, () => {
  console.log(`APLICACIÓN INICIARÁ EN EL PUERTO: ${environment.PORT}`);
});

// Con resources hablamos de los elementos que se van a exponer
