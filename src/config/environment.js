import * as dotenv from "dotenv";

// Carga las variables de entorno del .env en process.env
dotenv.config();

export default {
  PORT: process.env.PORT || 4500,
};
