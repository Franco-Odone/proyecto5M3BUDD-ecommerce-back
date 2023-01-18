import jwt from "jsonwebtoken";
import environment from "../../../config/environment.js";
const { TOKEN_SECRET } = environment;

// Función para validar un Token
export const verifyToken = (req, res, next) => {
  //Header es un objeto donde authorization es una de sus propiedades
  const authHeader = req.headers["authorization"];
  //   El token llega como Bearer <token>
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({
      status: "FAILED",
      error: "token no presente",
    });
  try {
    const payload = jwt.verify(token, TOKEN_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        status: "FAILED",
        error: "token expiró",
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        status: "FAILED",
        error: "token inválido",
      });
    }
  }
};
