import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import { errors } from "celebrate";
import routes from "./routes";

import AppError from "@errors/AppError";
import '@database/index';
import rateLimiter from "./middlewares/raterLimiter";

const app = express();

app.use(cors());
app.use(express.json());

app.use(rateLimiter);

app.use(routes);

app.use(errors());

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {

        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                status: "error",
                message: err.message
            });
        }

        return response.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
);

app.listen(3000, () => {
    console.log("Server started on port 3000");
})