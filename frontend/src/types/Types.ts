// Admin API Types and Interfaces

export interface Order {
  id: string;
  customerName: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: string | number;
  [key: string]: any;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
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
export const categories = ["All", "Railings", "Name Plates", "Gates", "Grills", "Elevation", "Custom"];
export const materials = ["All", "Stainless Steel", "Mild Steel", "Aluminium", "Brass", "Copper"];
export const projectTypes = ["All", "Residential", "Commercial", "Corporate"];

export type Category = typeof categories[number];
export type Material = typeof materials[number];
export type ProjectType = typeof projectTypes[number];

export interface Project {
  src: string,
  alt: string,
  title: string,
  category: Category,
  material: Material,
  projectType: ProjectType,
  location: string,
}

export interface Quote {
  name: string,
  email: string,
  phone: string,
  location: string,
  projectType: string,
  material: string,
  length: number,
  width: number,
  quantity: number,
  design: string,
  timeline: string,
  budget: number,
  details: string,
  image: string
}

export interface ContactType {
  name: string,
  email: string,
  phone: string,
  message: string
}

export type ApiOrderResponse = ApiResponse<Order[]> | ApiResponse<Order>;
export type ApiProductResponse = ApiResponse<Product[]> | ApiResponse<Product>;
export type ApiDeleteResponse = ApiResponse<{ message: string }>;

// API Client Configuration
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Admin Authentication
export const AUTH_CONFIG = {
  adminSecret: import.meta.env.VITE_ADMIN_SECRET || 'admin123',
  storageKey: 'adminToken',
  loginPath: '/admin/login',
  dashboardPath: '/admin',
};

// API Endpoints
export const API_ENDPOINTS = {
  orders: {
    list: '/orders',
    detail: (id: string) => `/orders/${id}`,
    updateStatus: (id: string) => `/orders/${id}/status`,
  },
  products: {
    list: '/products',
    detail: (id: string) => `/products/${id}`,
    digital: {
      list: '/products/digital',
    },
  },
  payments: {
    checkout: '/payments/checkout',
    verify: '/payments/verify',
  },
  projects: {
    list: '/projects'
  },
  quotes: {
    create: '/quotes'
  },
  contact: {
    create: '/contact'
  }
};
