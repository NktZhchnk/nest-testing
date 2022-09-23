import * as Joi from 'joi';

export const itemCreateUpdateSchema = Joi.object({
  name: Joi.string().required().min(3).max(256),
  price: Joi.number().min(0),
  count: Joi.number().min(0),
});
