import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-stronder.onrender.com/api/'
});

export const login = async (username: string, password: string) => {
  if (username === 'marcelo' && password === 'stronder@2025!!') {
    return { success: true };
  }
  throw new Error('Credenciais Inválidas');
};

export const productService = {
  create: async (formData: FormData) => {
    return api.post('/products', formData, {
      headers: {
      'Content-Type': 'multipart/form-data',
        key: 'f2958d7e6af27c7ebb2359a87739aaeddeede629cec2c9634aff936cd542e590'
      }
    });
  },
  getAll: async () => {
    return api.get('/products');
  },
  getById: async (id: string) => {
    return api.get(`/products/${id}`, {
      headers: {
        key: 'f2958d7e6af27c7ebb2359a87739aaeddeede629cec2c9634aff936cd542e590'
      }
    });
  },
  update: async (id: string, formData: FormData) => {
    return api.put(`/products/${id}`, formData, {
      headers: {
        key: 'f2958d7e6af27c7ebb2359a87739aaeddeede629cec2c9634aff936cd542e590'
      }
    });
  },
  delete: async (id: string) => {
    return api.delete(`/products/${id}`, {
      headers: {
        key: 'f2958d7e6af27c7ebb2359a87739aaeddeede629cec2c9634aff936cd542e590'
      }
    });
  },
  getCategories: async () => {
    return api.get('/categories');
  },
  getTypes: async () => {
    return api.get('/types');
  },
  getSizes: async () => {
    return api.get('/sizes');
  }
};