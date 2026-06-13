import express from 'express';
import { getProducts, addProduct, editProduct, removeProduct } from '../controller/productController';

const router = express.Router();

router.get('/', getProducts);
router.post('/', addProduct);
router.put('/:id', editProduct);
router.delete('/:id', removeProduct);

export default router;
