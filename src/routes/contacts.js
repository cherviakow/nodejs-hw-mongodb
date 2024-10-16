import express from 'express';
import {ctrlWrapper} from '../utils/ctrlWrapper.js';
const router = express.Router();
import {
  getContactController,
  getContactsController,
  createContactController,
  deleteContactController,
  changeContactTypeController,
} from '../controllers/contacts.js';

const jsonParser = express.json();


router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactController));

router.post('/contacts', jsonParser, ctrlWrapper(createContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

router.patch('/contacts/:contactId', jsonParser, ctrlWrapper(changeContactTypeController));

export default router;
