import { NextFunction, Request, Response } from "express";

import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function EnsureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      error: "Token inválido!",
    });
  }

  const [_, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };
  } catch (err) {
    return response.status(401).json({
      error: "Token inválido!",
    });
  }

  return next();
}
