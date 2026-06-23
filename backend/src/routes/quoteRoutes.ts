import express from 'express';
import { getQuotes, addQuote, editQuote, removeQuote, getQuoteById } from '../controller/quoteController';

const router = express.Router();

router.get('/', getQuotes);
router.get('/:id', getQuoteById);
router.post('/', addQuote);
router.put('/:id', editQuote);
router.delete('/:id', removeQuote);

export default router;