import { Request, Response } from 'express';
import productService from '../services/productService';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    if(!id) {
      throw new Error("Not received Id of Product");
    }
    const products = await productService.getProductById(id as string);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
};

export const getDigitalProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllDigitalProducts();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Failed to fetch digital products', error });
  }
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create product', error });
  }
};

export const editProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await productService.updateProduct(req.params.id as string, req.body);
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update product' + error });
  }
};

export const removeProduct = async (req: Request, res: Response) => {
  try {
    await productService.deleteProduct(req.params.id as string);
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete product ' });
  }
};
