// Simulacion en memoria de lo que es guardar los productos en una DB
const products = [];

// Funciones handlers
export const createProduct = (req, res) => {
  const body = req.body;
  products.push(body);
  res.json(body);
};

export const getProducts = (req, res) => {
  res.json(products);
};

export const getProductById = (req, res) => {
  const id = req.params.id;
  const product = products.find((product) => product.id === id);
  res.json(product);
};

export const updateProductById = (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const productIndex = products.findIndex((product) => product.id === id);
  products[productIndex] = body;
  res.json(products[productIndex]);
};

export const deleteProductById = (req, res) => {
  const id = req.params.id;
  const productIndex = products.findIndex((product) => product.id === id);
  const productRemoved = products.splice(productIndex, 1)[0];
  res.json(productRemoved);
};
