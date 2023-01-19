import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import Joi from "joi";

import environment from "../../../config/environment.js";
import { user } from "../models/users.model.js";

const { TOKEN_SECRET } = environment;
// registro de usuario
export const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  // schema para validar la data que está entrando
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(req.body);

  // Mensaje en inglés
  if (error) return res.status(400).send(error.details[0].message);

  let foundUser = await user.findOne({ email: req.body.email });

  if (foundUser)
    return res.status(400).send("El usuario o el email ya existe...");

  // GENERAMOS FRAGMENTO ALEATORIO PARA USARSE CON EL PASSWORD
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const newUser = await user.create({
    username,
    email,
    password: hashedPassword,
  });

  // Se genera el token
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

  const token = authToken(newUser);

  res.json({ newUser, token });
};

export const getUsers = async (req, res) => {
  const users = await user.find();
  res.json({ users });
};

export const getUserById = async (req, res) => {
  const id = req.params.id;
  const oneUser = await user.findById(id);
  res.json({ oneUser });
};

export const updateUserById = async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const userUpdated = await user.findByIdAndUpdate(id, body, {
    new: true,
  });
  res.json({ userUpdated });
};

export const deleteUserById = async (req, res) => {
  const id = req.params.id;
  const userRemoved = await user.findByIdAndDelete(id);
  res.json({ userRemoved });
};
