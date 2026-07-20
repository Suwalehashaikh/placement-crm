import jwt from "jsonwebtoken";
import { customError } from "../Utils/customError.js";


export const authCheck = async (req, res, next) => {
  console.log("=== AUTH MIDDLEWARE HIT ===");

  try {
    const authHeader = req.headers.authorization;
console.log("Authorization Header:", req.headers.authorization);
    if (!authHeader) {
      throw new customError(401, "Token not found");
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_KEY
    );
     
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};