import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', () => {
  const storageItems = localStorage.getItem('sataya.cart');
  const items = reactive(storageItems ? JSON.parse(storageItems) : []);

  const updateCount = (product, count) => {
    const findProduct = items.find((item) => item.id === product.id);
    if (!findProduct) {
      items.push({
        ...product,
        count,
        packing: product.items.length > 1 ? 1 : product.items[0].count
      });
    } else {
      findProduct.count = count;
    }

    localStorage.setItem('sataya.cart', JSON.stringify(items));
  };

  const removeItem = (id) => {
    const findIndex = items.findIndex((item) => item.id === id);

    if (findIndex >= 0) {
      items.splice(findIndex, 1);
    }

    localStorage.setItem('sataya.cart', JSON.stringify(items));
  };

  const getCount = (id) => {
    const findProduct = items.find((item) => item.id === id);

    if (findProduct) return findProduct.count;
    return 0;
  };

  const total = computed(() => items.length);
  const totalPrice = computed(() => {
    return items.reduce((acc, item) => (acc += item.price * (item.count / item.packing)), 0);
  });

  return {
    items,
    total,
    totalPrice,
    updateCount,
    removeItem,
    getCount
  };
});
