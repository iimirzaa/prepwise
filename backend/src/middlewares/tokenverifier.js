import jwt from "jsonwebtoken";
import { verifyAccessToken } from "../utils/tokenUtils.js";

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: "Access token is required",
      });
    }

    const [scheme, token] = authHeader.split(" ");
 

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: "Invalid authorization format",
      });
    }

    const decoded = verifyAccessToken(
      token,
    );

    req.user = decoded;

    next();

  } catch (error) {

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        status: 401,
        message: "Token expired",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        status: 401,
        message: "Invalid token",
      });
    }


    return res.status(500).json({
      success: false,
      status: 500,
      message: "Authentication failed",
    });
  }
};

export default verifyToken;