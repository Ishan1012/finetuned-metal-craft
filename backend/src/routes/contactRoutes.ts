import express from 'express';
import { getContacts, addContact, editContact, removeContact, getContactById } from '../controller/contactController';

const router = express.Router();

router.get('/', getContacts);
router.get('/:id', getContactById);
router.post('/', addContact);
router.put('/:id', editContact);
router.delete('/:id', removeContact);

export default router;