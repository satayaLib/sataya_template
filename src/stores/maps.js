import { ref } from 'vue';
import { defineStore } from 'pinia';
import Api from '@/lib/api.js';

export const useMapsStore = defineStore('maps', () => {
  const items = ref([]);
  const isLoaded = ref(false);

  const load = async (clusterId) => {
    isLoaded.value = false;

    const res = await Api.get('/maps', {
      clusterId
    });

    if (res?.status === 200) {
      items.value = res.data;
    }

    isLoaded.value = true;

    return res;
  };

  return { items, isLoaded, load };
});
