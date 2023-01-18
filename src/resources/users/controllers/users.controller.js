import bcryptjs from "bcryptjs";
import { user } from "../models/users.model.js";

export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  // GENERAMOS FRAGMENTO ALEATORIO PARA USARSE CON EL PASSWORD
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const newUser = await user.create({
    username,
    email,
    password: hashedPassword,
  });

  res.json(newUser);
};

export const getUsers = async (req, res) => {
  const users = await user.find();
  res.json(users);
};

export const getUserById = async (req, res) => {
  const id = req.params.id;
  const oneUser = await user.findById(id);
  res.json(oneUser);
};

export const updateUserById = async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const userUpdated = await user.findByIdAndUpdate(id, body, {
    new: true,
  });
  res.json(userUpdated);
};

export const deleteUserById = async (req, res) => {
  const id = req.params.id;
  const userRemoved = await user.findByIdAndDelete(id);
  res.json(userRemoved);
};
