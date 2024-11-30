import Joi from 'joi';

export const contactShema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'any.required': 'Contact name is required',
  }),
  phoneNumber: Joi.number().required(),
  email: Joi.string().min(3).max(20).required(),
  isFavourite: Joi.boolean().required(),
  contactType: Joi.string().min(3).max(20).required(),
});
