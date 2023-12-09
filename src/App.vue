<template>
  <HeaderBlock />
  <main class="main">
    <RouterView />
  </main>
  <FeedBack />
  <FooterBlock />
</template>

<script setup>
import { RouterView } from 'vue-router';
import HeaderBlock from '@/components/HeaderBlock.vue';
import FeedBack from '@/components/FeedBack.vue';
import FooterBlock from '@/components/FooterBlock.vue';
</script>
