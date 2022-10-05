import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';
import { useProductStore } from '../product';
import { mande } from 'mande';
import type { Product } from '../../types/product';
import { setting } from '../../setting.js';
import { useStore } from '../../stores';
const api = mande(setting.api_base);

export const useCartStore = defineStore('cart', () => {
  const cart = reactive(new Map());
  const productStore = useProductStore();
  const store = useStore();

  const getTotalItems = computed(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  });

  const getTotalPrice = computed(() => {
    let total = 0;
    cart.forEach((item, index) => {
      const product = productStore.getProductByID(index);
      if (product) total += item.quantity * (product as Product).price;
    });
    return total;
  });

  const getCartItems = computed(() => {
    const items: { product: Product; quantity: number; totalPrice: number; updatedAt: string }[] = [];
    cart.forEach((item, index) => {
      const product = productStore.getProductByID(index);
      if (product) {
        items.push({
          product: product,
          quantity: item.quantity,
          totalPrice: (product as Product).price * item.quantity,
          updatedAt: item.updatedAt,
        });
      }
    });
    items.sort((a, b) => {
      return a.updatedAt === b.updatedAt ? 0 : a.updatedAt > b.updatedAt ? -1 : 1;
    });
    return items;
  });

  function checkout() {
    const orders: { id: number; quantity: number; price: number; totalPrice: number; orderedAt: string }[] = [];
    cart.forEach((item, index) => {
      const product = productStore.getProductByID(index);
      if (product) {
        orders.push({
          id: index,
          quantity: item.quantity,
          price: (product as Product).price,
          totalPrice: (product as Product).price * item.quantity,
          orderedAt: item.updatedAt,
        });
      }
    });
    api.post('checkout', orders).then(() => {
      mutateRemoveAll();
      store.disableCart();
      store.enableCompleteModal();
    });
  }

  function setQuantity(id: number, quantity: number) {
    cart.set(id, { quantity: quantity, updatedAt: new Date() });
    if (cart.get(id)?.quantity <= 0) cart.delete(id);
  }

  function mutateQuantity(id: number, quantity: number) {
    cart.set(id, { quantity: cart.get(id)?.quantity + quantity || quantity, updatedAt: new Date() });
    if (cart.get(id)?.quantity <= 0) cart.delete(id);
  }

  function mutateRemoveItemByID(id: number) {
    cart.delete(id);
  }

  function mutateRemoveAll() {
    cart.clear();
  }

  return {
    cart,
    getTotalItems,
    getTotalPrice,
    getCartItems,
    setQuantity,
    mutateQuantity,
    mutateRemoveItemByID,
    mutateRemoveAll,
    checkout,
  };
});
