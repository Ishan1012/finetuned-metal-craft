import { Types } from 'mongoose';
import { findAllProducts, findProductById, createProductRepo, updateProductById, deleteProductById } from '../repository/productRepository';

export const getAllProducts = async () => {
  return await findAllProducts();
};

export const getProductById = async (id: string) => {
  return await findProductById(id);
};

export const createProduct = async (productData: any) => {
  return await createProductRepo(productData);
};

export const updateProduct = async (id: string, updateData: any) => {
  return await updateProductById(id, updateData);
};

export const deleteProduct = async (id: string) => {
  return await deleteProductById(id);
};
