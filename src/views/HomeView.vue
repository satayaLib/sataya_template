<template>
  <BannerBlock />
  <MapsBlock />
  <FaqBlock />
</template>

<script setup>
import { onMounted, nextTick } from 'vue';
import { scrollToEl } from '@/lib/scroll.js';
import BannerBlock from '@/components/BannerBlock.vue';
import FaqBlock from '@/components/FaqBlock.vue';
import MapsBlock from '@/components/MapsBlock.vue';

onMounted(async () => {
  await nextTick();
  scrollToEl();
});
</script>
