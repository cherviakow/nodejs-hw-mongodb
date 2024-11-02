import { Contact } from '../models/contact.js';

export const getAllContacts = async ({
  userId,
  page,
  perPage,
  sortBy,
  sortOrder,
}) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  Contact.where('userId').equals(userId);

  const query = { userId };

  const [total, data] = await Promise.all([
    Contact.countDocuments(query),
    Contact.find(query)
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

export function getContactById(id, userId) {
  return Contact.findOne({ _id: id, userId });
}

export function createContact(contact, userId) {
  return Contact.create({ ...contact, userId });
}

export function deleteContact(id, userId) {
  return Contact.findOneAndDelete({ _id: id, userId });
}

export function updateContact(id, contact) {
  return Contact.findByIdAndUpdate(id, contact);
}

export function changeContactType(id, newContact) {
  return Contact.findByIdAndUpdate({ _id: id }, newContact, { new: true });
}
