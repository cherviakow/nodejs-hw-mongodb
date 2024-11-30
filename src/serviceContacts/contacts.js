import { Contact } from '../models/contact.js';

export const getAllContacts = async ({ page, perPage, sortBy, sortOrder }) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

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

export const getContactById = async (id) => {
  return await Contact.findById(id);
};

export function createContact(contact) {
  return Contact.create(contact);
}

export function deleteContact(id) {
  return Contact.findByIdAndDelete(id);
}

export function updateContact(id, contact) {
  return Contact.findByIdAndUpdate(id, contact);
}

export function changeContactType(id, newContact) {
  return Contact.findByIdAndUpdate(id, newContact, { new: true });
}
