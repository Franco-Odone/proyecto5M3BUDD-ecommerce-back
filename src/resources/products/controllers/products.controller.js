import { product } from "../models/products.model.js";

// Funciones handlers
export const createProduct = async (req, res) => {
  const body = req.body;
  const newProduct = await product.create(body);
  res.json(newProduct);
};

export const getProducts = async (req, res) => {
  const userLogged = req.user;
  console.log(`🚀 ~ userLogged`, userLogged);

  const products = await product.find();
  res.json(products);
};

export const getProductById = async (req, res) => {
  const id = req.params.id;
  const oneProduct = await product.findById(id);
  res.json(oneProduct);
};

export const updateProductById = async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const productUpdated = await product.findByIdAndUpdate(id, body, {
    new: true,
  });
  res.json(productUpdated);
};

export const deleteProductById = async (req, res) => {
  const id = req.params.id;
  const productRemoved = await product.findByIdAndDelete(id);
  res.json(productRemoved);
};
