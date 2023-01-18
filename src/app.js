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

// iniciamos la conexión la base de datos al momento de levantar la app
startConnection();

// bodyparser
app.use(bodyParser.urlencoded({ extended: true }));

// Se configura un middleware para aceptar requests de tipo JSON
// Habilitar CORS
app.use(cors());
app.use(express.json());

// Se agregan los distintos endpoints
app.use(productsRouter);
app.use(usersRouter);
app.use(authRouter);

// Se inicia la aplicación y se queda escuchando requests en el puerto indicado
app.listen(environment.PORT, () => {
  console.log(`APLICATION INICIARÁ EN EL PUERTO: ${environment.PORT}`);
});

// Con resources hablamos de los elementos que se van a exponer
