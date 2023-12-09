import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import Api from '@/lib/api.js';

export const usePlayersStore = defineStore('players', () => {
  const items = ref([]);
  const isLoaded = ref(false);
  const players = computed(() => {
    return items.value.reduce((acc, item) => {
      acc[item.map.id] = item.players.length;
      return acc;
    }, {});
  });

  const load = async (clusterId) => {
    isLoaded.value = false;

    const res = await Api.get('/players', {
      clusterId
    });

    if (res?.status === 200) {
      items.value = res.data;
    }

    isLoaded.value = true;

    return res;
  };

  return { items, players, isLoaded, load };
});
