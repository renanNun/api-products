import AppError from "@errors/AppError";
import Redis from 'ioredis';
import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from 'rate-limiter-flexible';

export default async function rateLimiter(request: Request, response: Response, next: NextFunction): Promise<void> {

    try {
        const redisClient = new Redis({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
            password: process.env.REDIS_PASSWORD || undefined
        });

        const limiter = new RateLimiterRedis({
            storeClient: redisClient,
            keyPrefix: "ratelimit",
            points: 5,
            duration: 1
        });

        await limiter.consume(request.ip);

        return next();
    } catch (error) {
        throw new AppError("Too many requests", 429);
    }

}