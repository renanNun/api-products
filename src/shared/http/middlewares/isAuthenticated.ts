import AppError from "@errors/AppError";
import authConfig from '@config/auth';
import { NextFunction, Request, Response } from "express";
import { verify, Secret } from "jsonwebtoken";

export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError("JWT token is missing.");
    }

    const [, token] = authHeader.split(" ");

    try {
        const decoded = verify(token, authConfig.jwt.secret as Secret);

        const { sub } = decoded as { sub: string };

        request.user = {
            id: sub,
        };

        return next();
    } catch (error) {

        throw new AppError("Invalid JWT token.", 401);
        
    }
}