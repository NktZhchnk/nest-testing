import * as Joi from 'joi';

export const userUpdatePasswordSchema = Joi.object({
  password: Joi.string().required().min(6).max(256),
  new_password: Joi.string().required().min(6).max(256),
})
