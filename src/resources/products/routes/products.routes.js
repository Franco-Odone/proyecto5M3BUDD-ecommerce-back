import { Router } from "express";
import { verifyToken } from "../../auth/middlewares/auth.middlewares.js";
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
} from "../controllers/products.controller.js";

// Definimos la instancia de nuestro express router
const productsRouter = Router();

// Se define la base de la URI para exponer el servicio
const baseURI = "/products";

/* 
  Se configura según el estandar REST los verbos HTTP 
  a vincular para realizar las operaciones CRUD. 
  Los handlers de cada verbo HTTP se deben construir en el controller
  y luego agregarlos aca.
*/

productsRouter.post(baseURI, verifyToken, createProduct);
productsRouter.get(baseURI, getProducts);
productsRouter.get(`${baseURI}/:id`, getProductById);
productsRouter.put(`${baseURI}/:id`, verifyToken, updateProductById);
productsRouter.delete(`${baseURI}/:id`, verifyToken, deleteProductById);

export default productsRouter;
