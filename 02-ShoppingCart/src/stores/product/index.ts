import { defineStore } from 'pinia';
import { ref } from 'vue';
import { mande } from 'mande';
import type { Product } from '../../types/product';
import { setting } from '../../setting.js';
const api = mande(setting.api_base);

export const useProductStore = defineStore('product', () => {
  const products = ref([]);
  const getProducts = async () => {
    try {
      api.get('products').then((r) => {
        if (Array.isArray(r)) {
          r.forEach((item) => {
            products.value.push(item as never);
          });
        }
      });
    } catch (error) {
      return error;
    }
  };
  getProducts();

  function getProductByID(id: number) {
    if (products.value.length > 0) return products.value.find((item) => (item as Product).id === id);
    else return null;
  }

  return {
    products,
    getProductByID,
  };
});
