import mongoose from "mongoose";
import environment from "./environment.js";

mongoose.set("strictQuery", false);

// Obtenemos la URI de la base de datos MONGODB d las variables de entorno.
const mongoDbURI = environment.DB_URI;

// Definimos un método para la conexión  a la base de datos
export const startConnection = () => {
  mongoose
    .connect(mongoDbURI, {
      // esta opción especifica que se debe usar el nuevo analizador de URL de MongoDB en lugar del antiguo.
      useNewUrlParser: true,
      // esta opción especifica que se debe usar la nueva topología unificada de MongoDB en lugar de las topologías antiguas.
      useUnifiedTopology: true,
      // Estas opciones son especificadas para que el código sea compatible con las últimas versiones de MongoDB y evitar posibles errores o advertencias, al mismo tiempo de seguir las mejores practicas de programación.
    })
    .then(() => console.log("La conexión a la DB es correcta"))
    .catch((error) => {
      console.error(error);
      // Detiene la app por completo
      process.exit(1);
    });
};

// Definimos y exportamos el objeto de la conexión
// Este export permite que otros archivos puedan importar y utilizar la conexión a la base de datos mediante "import db from './nombreArchivo'"
const db = mongoose.connection;
export default db;
