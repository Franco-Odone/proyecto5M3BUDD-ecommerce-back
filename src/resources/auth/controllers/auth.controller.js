import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import environment from "../../../config/environment.js";
import { user } from "../../users/models/users.model.js";

const { TOKEN_SECRET } = environment;

export const login = async (req, res) => {
  const { username, password, id } = req.body;

  // Validamos el body
  if (!username || !password) {
    res.json({
      status: "FAILED",
      error: "El usuario o contraseña no pueden ser vacíos",
    });
  }
  // Buscamos el usuario en la DB y verificamos si la contraseña es válida
  // ENCONTRAMOS UN USUARIO
  let foundUser = await user.findOne({ id });

  // SI NO HUBO UN USUARIO ENCONTRADO, DEVOLVEMOS UN ERROR
  if (!foundUser) {
    return res.status(400).json({ msg: "El usuario no existe" });
  }

  // SI TODO OK, HACEMOS LA EVALUACIÓN DE LA CONTRASEÑA ENVIADA CONTRA LA BASE DE DATOS
  const passCorrecto = await bcryptjs.compare(password, foundUser.password);

  // SI EL PASSWORD ES INCORRECTO, REGRESAMOS UN MENSAJE SOBRE ESTO
  if (!passCorrecto) {
    return await res.status(400).json({ msg: "Password incorrecto" });
  }

  // SI TODO CORRECTO, GENERAMOS UN JSON WEB TOKEN
  // El payload es  donde aparecen los datos de usuario y privilegios, así como toda la información
  // que queramos añadir, todos los datos que creamos convenientes.

  const payload = {
    role: "USER",
    username: username,
  };
  const token = jwt.sign(payload, TOKEN_SECRET, {
    expiresIn: 3600,
  });
  res.json({ token });
};
