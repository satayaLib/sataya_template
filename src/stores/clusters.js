import { ref } from 'vue';
import { defineStore } from 'pinia';
import Api from '@/lib/api.js';

export const useClustersStore = defineStore('clusters', () => {
  const items = ref([]);
  const isLoaded = ref(false);

  const load = async () => {
    isLoaded.value = false;

    const res = await Api.get('/clusters');

    if (res?.status === 200) {
      items.value = res.data;
    }

    isLoaded.value = true;

    return res;
  };

  return { items, isLoaded, load };
});
