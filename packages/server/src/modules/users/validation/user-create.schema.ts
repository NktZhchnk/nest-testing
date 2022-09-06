import * as Joi from 'joi';

export const userCreateSchema = Joi.object({
  username: Joi.string().required().min(4).max(256),
  password: Joi.string().required().min(6).max(256),
  first_name: Joi.string().required().min(2).max(256),
  last_name: Joi.string().required().min(2).max(256),
});
