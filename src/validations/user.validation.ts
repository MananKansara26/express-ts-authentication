import { Joi } from 'express-validation';

export const getUser = {
  params: Joi.object({
    userId: Joi.string().email().required(),
  }),
};
