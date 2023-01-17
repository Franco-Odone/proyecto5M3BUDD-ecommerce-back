import express from "express";
import environment from "./config/environment.js";
import productsRouter from "./resources/products/routes/products.routes.js";
// Se crea una instancia de una aplicación express
const app = express();

// Se configura un middleware para aceptar requests de tipo JSON
app.use(express.json());

// Se agrega una ruta (endpoint) por defecto
app.get("/", (req, res) => {
  res.json({ message: "Hola mundo" });
});

// Se agrega el endpoint de products
app.use(productsRouter);

// Se inicia la aplicación y se queda escuchando requests en el puerto 3000
app.listen(environment.PORT, () => {
  console.log(`APLICATION INICIARÁ EN EL PUERTO: ${environment.PORT}`);
});

// Con resources hablamos de los elementos que se van a exponer
