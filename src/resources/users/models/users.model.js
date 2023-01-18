import mongoose from "mongoose";

/* 
Se define el esquema de mongoose, esta corresponde a la estructura de lo que sería un usuario
El id es generado automáticamente
*/
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Permite agregar la fecha en el que fue generado el documento.
  }
);

// Se crea la instancia del modelo.
export const user = new mongoose.model("user", userSchema);
