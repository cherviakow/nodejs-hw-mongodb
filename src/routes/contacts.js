import express from 'express';
import {ctrlWrapper} from '../utils/ctrlWrapper.js';
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
import { patchContactShema } from '../validation/contact.js';

import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();
const jsonParser = express.json();


router.get('/contacts', authenticate, ctrlWrapper(getContactsController));

router.get('/contacts/:id', authenticate, isValidID, ctrlWrapper(getContactController));

router.post('/contacts', authenticate, jsonParser, validateBody(contactShema), ctrlWrapper(createContactController));

router.put('/contacts/:id', authenticate, isValidID, jsonParser, ctrlWrapper(updateContactController));

router.patch('/contacts/:id', authenticate, isValidID, jsonParser, validateBody(patchContactShema), ctrlWrapper(changeContactTypeController));

router.delete('/contacts/:id', authenticate, isValidID, ctrlWrapper(deleteContactController));


export default router;
