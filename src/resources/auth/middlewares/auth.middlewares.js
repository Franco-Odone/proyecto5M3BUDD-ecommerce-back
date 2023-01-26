import jwt from "jsonwebtoken";
import environment from "../../../config/environment.js";
const { TOKEN_SECRET } = environment;

// Función para validar un Token
export const verifyToken = (req, res, next) => {
  // Headers ([Symbol(kHeaders)] en la request) es un objeto donde authorization es una de sus propiedades y a su vez dónde viene el token
  // Se accede con .headers
  const authHeader = req.headers["authorization"];
  // El token llega como Bearer + ' ' +  <token>
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({
      status: "FAILED",
      error: "token no presente",
    });
  try {
    // verify() a diferencia de decode() verifica que el token esté firmado correctamente y que no haya expirado
    // decode() extrae el payload sin verificar nada
    const payload = jwt.verify(token, TOKEN_SECRET);
    // se guarda el payload del token dentro de la req en una nueva propiedad en esta caso user (usuario que inició sesión)
    req.user = payload;
    // paso el siguiente handler/middleware en la ruta
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
