import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from "../controllers/users.controller.js";

// Definimos la instancia de nuestro express router
const usersRouter = Router();

// Se define la base de la URI para exponet el servicio
const baseURI = "/users";

/* 
  Se configura según el estandar REST los verbos HTTP 
  a vincular para realizar las operaciones CRUD. 
  Los handlers de cada verbo HTTP se deben construir en el controller
  y luego agregarlos aca.

  VERBO HTTP              CRUD          Controller handler
     POST      --------> CREATE --------> createProduct
     GET       --------> READ   --------> getProducts / getProductById
     PUT/PATCH --------> UPDATE --------> updateProductById
     DELETE    --------> DELETE --------> deleteProductById
*/
usersRouter.post(baseURI, createUser);
usersRouter.get(baseURI, getUsers);
usersRouter.get(`${baseURI}/:id`, getUserById);
usersRouter.put(`${baseURI}/:id`, updateUserById);
usersRouter.delete(`${baseURI}/:id`, deleteUserById);

export default usersRouter;
