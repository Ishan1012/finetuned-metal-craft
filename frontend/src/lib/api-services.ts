import apiClient from './apiClient';

export interface Order {
  id: string;
  customerName: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: string;
  [key: string]: any;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  material?: string;
  inStock: boolean;
  [key: string]: any;
}

// Order API calls
export const orderAPI = {
  // Fetch all orders
  getOrders: async () => {
    try {
      const response = await apiClient.get('/orders');
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      throw error;
    }
  },

  // Fetch single order by ID
  getOrderById: async (id: string) => {
    try {
      const response = await apiClient.get(`/orders/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Failed to fetch order ${id}:`, error);
      throw error;
    }
  },

  // Update order status
  updateOrderStatus: async (id: string, status: string) => {
    try {
      const response = await apiClient.patch(`/orders/${id}/status`, { status });
      return response.data.data;
    } catch (error) {
      console.error(`Failed to update order ${id}:`, error);
      throw error;
    }
  },
};

// Product API calls
export const productAPI = {
  // Fetch all products
  getProducts: async () => {
    try {
      const response = await apiClient.get('/products');
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  },

  // Create new product
  createProduct: async (productData: Omit<Product, 'id'>) => {
    try {
      const response = await apiClient.post('/products', productData);
      return response.data.data;
    } catch (error) {
      console.error('Failed to create product:', error);
      throw error;
    }
  },

  // Update product
  updateProduct: async (id: string, productData: Partial<Product>) => {
    try {
      const response = await apiClient.put(`/products/${id}`, productData);
      return response.data.data;
    } catch (error) {
      console.error(`Failed to update product ${id}:`, error);
      throw error;
    }
  },

  // Delete product
  deleteProduct: async (id: string) => {
    try {
      const response = await apiClient.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to delete product ${id}:`, error);
      throw error;
    }
  },
};
