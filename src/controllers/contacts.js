import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  changeContactType,
} from '../serviceContacts/contacts.js';
import httpErrors from 'http-errors';

export async function getContactsController(req, res) {
  const contacts = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: 'Found all contacts',
    data: contacts,
  });
};

export async function getContactController(req, res, next) {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);
  if (!contact) {
    console.log('Contact not found');
    throw httpErrors(404, 'Contact not found!');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}

export async function createContactController(req, res) {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };

  const result = await createContact(contact);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: result,
  });
}

export async function deleteContactController(req, res) {
  const { id } = req.params;
  const result = await deleteContact(id);

  if (!result) {
    console.log('Contact not found');
    throw httpErrors(404, 'Contact not found!');
}
res.status(204).json({
    status: 204,
    message: `Contact deleted successfully`,
  });
};

export async function changeContactTypeController(req, res){

    const { contactId } = req.params;

  const result = await changeContactType(contactId, req.body);

  if (!result) {
    throw httpErrors(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result,
  });
};
