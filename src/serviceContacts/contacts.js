import { Contact } from '../models/contact.js';

export const getAllContacts = async () => {
  return await Contact.find();
};

export const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

export function createContact(contact) {
  return Contact.create(contact);
}

export function deleteContact(id) {
  return Contact.findByIdAndDelete(id);
}

export function updateContact(contactId, contact) {
  return Contact.findByIdAndUpdate(contactId, contact);
}

export function changeContactType(contactId, newContact) {
  return Contact.findByIdAndUpdate(contactId, newContact, { new: true });
}
