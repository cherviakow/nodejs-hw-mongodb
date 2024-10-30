import { Contact } from '../models/contact.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  userId,
}) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = Contact.find();
  contactQuery.where('userId').equals(userId);

  const [total, data] = await Promise.all([
    Contact.countDocuments(),
    Contact.find()
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);
  const totalPages = Math.ceil(total / perPage);

  return {
    status: 200,
    message: 'Successfully found contacts!',
    data,
    page,
    perPage,
    totalItems: total,
    hasPreviousPage: page > 1,
    hasNextPage: totalPages - page > 0,
  };
};

export const getContactById = async (id, userId) => {
  return await Contact.findById({_id: id, userId});
};

export function createContact(contact, userId) {
  return Contact.create({_id: contact, userId});
}

export function deleteContact(id, userId) {
  return Contact.findByIdAndDelete(id, userId);
}

export function updateContact(id, contact, userId) {
  return Contact.findByIdAndUpdate(id, contact, userId);
}

export function changeContactType(id, newContact, userId) {
  return Contact.findByIdAndUpdate(id, newContact, userId, { new: true });
}
