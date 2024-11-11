import Joi from 'joi';

export const contactShema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'any.required': 'Contact name is required',
  }),
  phoneNumber: Joi.number().required(),
  email: Joi.string().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
  photo: Joi.string().optional(),
});

export const patchContactShema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'any.required': 'Contact name is required',
  }),
  phoneNumber: Joi.number(),
  email: Joi.string().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});
