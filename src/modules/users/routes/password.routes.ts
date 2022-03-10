import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import ResetPasswordController from "../controllers/ResetPasswordController";

const passwordRouter = Router();

passwordRouter.post(
    '/reset',
    celebrate({
        [Segments.BODY]: {
            token: Joi.string().uuid().required(),
            password: Joi.string().min(6).required()
        }
    }),
    new ResetPasswordController().handle
)

export default passwordRouter;