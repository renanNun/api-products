import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import CreateSessionController from "../controllers/CreateSessionController";

const sessionRouter = Router();

sessionRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }
    }),
    new CreateSessionController().handle
)

export default sessionRouter;