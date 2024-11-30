import express from 'express';
import {ctrlWrapper} from '../utils/ctrlWrapper.js';
const router = express.Router();
import {
  getContactController,
  getContactsController,
  createContactController,
  deleteContactController,
  changeContactTypeController,
  updateContactController,
} from '../controllers/contacts.js';
import { isValidID } from '../middlewares/isValidID.js';
import { validateBody } from '../middlewares/validateBody.js';
import { contactShema } from '../validation/contact.js';


const jsonParser = express.json();


router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:id', isValidID, ctrlWrapper(getContactController));

router.post('/contacts', jsonParser, validateBody(contactShema), ctrlWrapper(createContactController));

router.put('/contacts/:id', isValidID, jsonParser, ctrlWrapper(updateContactController));

router.patch('/contacts/:id', isValidID, jsonParser, ctrlWrapper(changeContactTypeController));

router.delete('/contacts/:id', isValidID, ctrlWrapper(deleteContactController));


export default router;
