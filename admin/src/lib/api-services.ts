import apiClient from './apiClient';

export interface Order {
  id: string;
  customerName: string;
  date: string;
  status: 'Created' | 'Processing' | 'Paid' | 'Shipped' | 'Delivered' | 'Cancelled';
  totalAmount: number;
  [key: string]: any;
}

export interface Product {
  _id: string;
  name: string;
  category: string;
  isDigital: boolean;
  price: number;
  status: 'In Stock' | 'Out of Stock';
  material?: string;
  image: string;
  url?: string;
  description?: string;
  [key: string]: any;
}

export const categories = ["All", "Railings", "Name Plates", "Gates", "Grills", "Elevation", "Custom"];
export const materials = ["All", "Stainless Steel", "Mild Steel", "Aluminium", "Brass", "Copper"];
export const projectTypes = ["All", "Residential", "Commercial", "Corporate"];

export type Category = typeof categories[number];
export type Material = typeof materials[number];
export type ProjectType = typeof projectTypes[number];

export interface Project {
  _id: string,
  src: string,
  alt: string,
  title: string,
  category: Category,
  material: Material,
  projectType: ProjectType,
  location: string,
}

export interface Quote {
  _id: string,
  src: string,
  alt: string,
  title: string,
  category: Category,
  material: Material,
  projectType: ProjectType,
  location: string,
}

export interface Contact {
  name: string;
  email: string;
  phone: string;
  message: string;
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

  getDigitalProducts: async () => {
    try {
      const response = await apiClient.get('/products/digital');
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

// Project API
export const projectAPI = {
  // Fetch all projects
  getProjects: async () => {
    try {
      const response = await apiClient.get('/projects');
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      throw error;
    }
  },

  // Create new project
  createProject: async (projectData: Omit<Project, '_id'>) => {
    try {
      const response = await apiClient.post('/projects', projectData);
      return response.data.data;
    } catch (error) {
      console.error('Failed to create project:', error);
      throw error;
    }
  },

  // Update project
  updateProject: async (id: string, projectData: Partial<Project>) => {
    try {
      const response = await apiClient.put(`/projects/${id}`, projectData);
      return response.data.data;
    } catch (error) {
      console.error(`Failed to update project ${id}:`, error);
      throw error;
    }
  },

  // Delete project
  deleteProject: async (id: string) => {
    try {
      const response = await apiClient.delete(`/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to delete project ${id}:`, error);
      throw error;
    }
  },
};

// Quote API
export const quoteAPI = {
  // Fetch all quotes
  getQuotes: async () => {
    try {
      const response = await apiClient.get('/quotes');
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to fetch quotes:', error);
      throw error;
    }
  },

  // Create new quote
  createQuote: async (quoteData: Omit<Quote, '_id'>) => {
    try {
      const response = await apiClient.post('/quotes', quoteData);
      return response.data.data;
    } catch (error) {
      console.error('Failed to create quote:', error);
      throw error;
    }
  },

  // Update quote
  updateQuote: async (id: string, quoteData: Partial<Quote>) => {
    try {
      const response = await apiClient.put(`/quotes/${id}`, quoteData);
      return response.data.data;
    } catch (error) {
      console.error(`Failed to update quote ${id}:`, error);
      throw error;
    }
  },

  // Delete quote
  deleteQuote: async (id: string) => {
    try {
      const response = await apiClient.delete(`/quotes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to delete quote ${id}:`, error);
      throw error;
    }
  },
};

// Contact API
export const contactAPI = {
  // Fetch all contacts
  getContacts: async () => {
    try {
      const response = await apiClient.get('/contact');
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
      throw error;
    }
  },

  // Create new contact
  createContact: async (contactData: Omit<Contact, '_id'>) => {
    try {
      const response = await apiClient.post('/contact', contactData);
      return response.data.data;
    } catch (error) {
      console.error('Failed to create contact:', error);
      throw error;
    }
  },

  // Update contact
  updateContact: async (id: string, contactData: Partial<Contact>) => {
    try {
      const response = await apiClient.put(`/contact/${id}`, contactData);
      return response.data.data;
    } catch (error) {
      console.error(`Failed to update contact ${id}:`, error);
      throw error;
    }
  },

  // Delete contact
  deleteContact: async (id: string) => {
    try {
      const response = await apiClient.delete(`/contact/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to delete contact ${id}:`, error);
      throw error;
    }
  },
};