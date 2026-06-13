import { Product } from '../model/Product';

export const findAllProducts = async () => {
  return await Product.find().sort({ createdAt: -1 });
};

export const findProductById = async (id: string) => {
  return await Product.findById(id);
};

export const createProductRepo = async (productData: any) => {
  return await Product.create(productData);
};

export const updateProductById = async (id: string, updateData: any) => {
  return await Product.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteProductById = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};