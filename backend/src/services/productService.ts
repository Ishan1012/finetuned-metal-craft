import { findAllProducts, findProductById, createProductRepo, updateProductById, deleteProductById } from '../repository/productRepository';
import { decryptUrl, encryptUrl } from '../utils/cryptoUtils';

const productService = {
  getAllProducts: async () => {
    const products = await findAllProducts();
    const readymadeProducts = products.filter((item) => item.isDigital === false);

    return readymadeProducts;
  },

  getAllDigitalProducts: async () => {
    const products = await findAllProducts();
    const digitalProducts = products.filter((item) => item.isDigital === true);

    return digitalProducts.map((product) => {
      if (product.url) {
        const plainProduct = product.toObject();
        delete plainProduct.url;
        return plainProduct;
      }
      return product;
    });
  },

  getProductById: async (id: string) => {
    const product = await findProductById(id);
    if (product && product.isDigital && product.url) {
      const plainProduct = product.toObject();
      if (plainProduct.url) delete plainProduct.url;
      return plainProduct;
    }

    return product;
  },

  createProduct: async (productData: any) => {
    const dataToSave = { ...productData };

    if (dataToSave.url && dataToSave.isDigital) {
      dataToSave.url = encryptUrl(dataToSave.url);
    }

    return await createProductRepo(dataToSave);
  },

  updateProduct: async (id: string, updateData: any) => {
    const dataToUpdate = { ...updateData };

    if (dataToUpdate.url) {
      dataToUpdate.url = encryptUrl(dataToUpdate.url);
    }

    return await updateProductById(id, dataToUpdate);
  },

  deleteProduct: async (id: string) => {
    return await deleteProductById(id);
  }
};

export default productService;