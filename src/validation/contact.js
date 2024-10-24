import Joi from 'joi';

export const contactShema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'any.required': 'Contact name is required',
  }),
  phoneNumber: Joi.number(),
  email: Joi.string().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().min(3).max(20),
});
