import * as Joi from 'joi';

export const userUpdateSchema = Joi.object({
  first_name: Joi.string().required().min(2).max(256),
  last_name: Joi.string().required().min(2).max(256),
})
