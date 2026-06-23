import express from 'express';
import { getProducts, addProduct, editProduct, removeProduct, getDigitalProducts, getProductById } from '../controller/productController';

const router = express.Router();

router.get('/', getProducts);
router.get('/digital', getDigitalProducts);
router.get('/:id', getProductById);
router.post('/', addProduct);
router.put('/:id', editProduct);
router.delete('/:id', removeProduct);

export default router;
