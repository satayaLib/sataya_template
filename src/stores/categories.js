import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import Api from '@/lib/api.js';

export const useCategoriesStore = defineStore('categories', () => {
  const items = ref([]);
  const isLoaded = ref(false);
  const categories = computed(() => {
    return items.value.reduce((acc, item) => {
      if (item.level > 1) {
        return acc;
      }

      acc.push({
        ...item,
        children: items.value.filter((children) => children.parent_id === item.id)
      });

      return acc;
    }, []);
  });

  const load = async (clusterId) => {
    isLoaded.value = false;

    const res = await Api.get('/category', {
      clusterId
    });

    if (res?.status === 200) {
      items.value = res.data;
    }

    isLoaded.value = true;

    return res;
  };

  return { items, categories, isLoaded, load };
});
