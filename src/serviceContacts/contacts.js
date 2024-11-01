import createHttpError from 'http-errors';
import { Contact } from '../models/contact.js';

export const getAllContacts = async ({
  userId,
  page,
  perPage,
  sortBy,
  sortOrder,
  filter={}
}) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  // const contactQuery = Contact.find();
  // contactQuery.where('userId').equals(userId);


  const query = { userId};
  if(!userId){
    throw createHttpError(400, 'invalid ID');
  }

  if (filter.contactType) {
    query.contactType = filter.contactType;
  }

  if (filter.isFavourite !== undefined) {
    query.isFavourite = filter.isFavourite;
  }




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


export function getContactById (id, userId){
  return Contact.findOne({_id: id, userId});
};

export function createContact(contact, userId) {
  return Contact.create({...contact, userId});
}

export function deleteContact(id, userId) {
  return Contact.findOneAndDelete({_id: id, userId});
}

export function updateContact(id, contact) {
  return Contact.findByIdAndUpdate(id, contact);
 }

export function changeContactType(id, newContact) {
  return Contact.findByIdAndUpdate({_id: id}, newContact, { new: true });
}
