import { ref } from 'vue';
import { defineStore } from 'pinia';
import Api from '@/lib/api.js';

export const useProductsStore = defineStore('products', () => {
  const products = ref([]);
  const total = ref(0);
  const isLoaded = ref(false);

  const load = async (search = false, filter = {}, page = 1, limit = 16, order) => {
    isLoaded.value = false;

    const data = {
      ...filter,
      page,
      limit,
      sort: order?.[0]?.order || 'asc',
      order: order?.[0]?.key || 'price'
    };

    if (search) {
      data.search = search;
    }

    const res = await Api.get('/products', {
      ...data
    });

    if (res?.status === 200) {
      products.value = res.data.rows;
      total.value = res.data.count;
    }

    isLoaded.value = true;

    return res;
  };

  return { products, total, isLoaded, load };
});
