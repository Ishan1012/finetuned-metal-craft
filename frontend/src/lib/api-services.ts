import { API_ENDPOINTS, ContactType, Quote } from '@/types/Types';
import apiClient from './apiClient';

// Order API calls
export const orderAPI = {
  // Fetch all orders
  getOrders: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.orders.list);
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      throw error;
    }
  },

  // Fetch single order by ID
  getOrderById: async (id: string) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.orders.detail(id));
      return response.data.data;
    } catch (error) {
      console.error(`Failed to fetch order ${id}:`, error);
      throw error;
    }
  },

  // Update order status
  updateOrderStatus: async (id: string, status: string) => {
    try {
      const response = await apiClient.patch(API_ENDPOINTS.orders.updateStatus(id));
      return response.data.data;
    } catch (error) {
      console.error(`Failed to update order ${id}:`, error);
      throw error;
    }
  },
};

export const paymentAPI = {
  checkout: async (payload: any) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.payments.checkout, payload);
      // Assuming your backend returns { success: true, order: {...}, dbOrderId: '...' }
      return response.data;
    } catch (error) {
      console.error('Failed to initialize checkout:', error);
      throw error;
    }
  },

  verify: async (payload: any) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.payments.verify, payload);
      return response.data;
    } catch (error) {
      console.error('Failed to verify payment:', error);
      throw error;
    }
  }
};

// Product API calls
export const productAPI = {
  getProducts: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.products.list);
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  },
  getDigitalProducts: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.products.digital.list);
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  },
  getProductById: async (id: string) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.products.detail(id));
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  },
};

// Project API
export const projectAPI = {
  // Fetch all projects
  getProjects: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.projects.list);
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      throw error;
    }
  },
};

// Quote API
export const quoteAPI = {
  // Create new project
  createQuote: async (quoteData: Omit<Quote, 'id'>) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.quotes.create, quoteData);
      return response.data;
    } catch (error) {
      console.error('Failed to create quote:', error);
      throw error;
    }
  },
};

// Contact API
export const contactAPI = {
  // Create new project
  createContact: async (contactData: ContactType) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.contact.create, contactData);
      return response.data;
    } catch (error) {
      console.error('Failed to create contact:', error);
      throw error;
    }
  },
};