import mongoose from "mongoose";

/* 
Se define el esquema de mongoose, esta corresponde a la estructura de lo que sería un producto
El id es generado automáticamente
*/
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  inCart: {
    type: Boolean,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

// Se crea la instancia del modelo.
export const product = new mongoose.model("product", productSchema);
