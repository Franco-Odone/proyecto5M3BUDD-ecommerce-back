import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import Joi from "joi";

import environment from "../../../config/environment.js";
import { user } from "../../users/models/users.model.js";

const { TOKEN_SECRET } = environment;

export const login = async (req, res) => {
  const { password } = req.body;

  // schema para validar la data que está entrando
  const schema = Joi.object({
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(req.body);

  // Mensaje en inglés
  if (error) return res.status(400).send(error.details[0].message);

  // Buscamos el usuario en la DB y verificamos si la contraseña es válida
  // ENCONTRAMOS UN USUARIO

  let foundUser = await user.findOne({ email: req.body.email });

  // SI NO HUBO UN USUARIO ENCONTRADO, DEVOLVEMOS UN ERROR
  if (!foundUser) return res.status(400).send("Contraseña o email no válidos");

  // SI TODO OK, HACEMOS LA EVALUACIÓN DE LA CONTRASEÑA ENVIADA CONTRA LA BASE DE DATOS
  const passCorrecto = await bcryptjs.compare(password, foundUser.password);

  // SI EL PASSWORD ES INCORRECTO, REGRESAMOS UN MENSAJE SOBRE ESTO
  if (!passCorrecto) {
    return await res.status(400).send("Contraseña incorrecta");
  }

  // SI TODO CORRECTO, GENERAMOS UN JSON WEB TOKEN
  // El payload es  donde aparecen los datos de usuario y privilegios, así como toda la información
  // que queramos añadir, todos los datos que creamos convenientes.

  const authToken = (user) => {
    const token = jwt.sign(
      // Payload
      {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      TOKEN_SECRET
    );
    return token;
  };

  const token = authToken(foundUser);

  res.json({ foundUser, token });
};
