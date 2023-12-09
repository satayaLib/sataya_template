<template>
  <nav class="menu">
    <RouterLink to="/shop" class="menu-item">Магазин</RouterLink>
    <RouterLink to="/#maps" class="menu-item" @click="scrollToEl('#maps')">Наши сервера</RouterLink>
    <!-- <RouterLink to="/#rating" class="menu-item" @click="scrollToEl('#rating')">Рейтинг</RouterLink> -->
    <RouterLink to="/#faq" class="menu-item" @click="scrollToEl('#faq')">Вопросы</RouterLink>
    <RouterLink to="/rules" class="menu-item">Правила</RouterLink>
    <a href="https://discord.gg/FszYUdSyHM" target="_blank" class="menu-item">Discord</a>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { scrollToEl } from '@/lib/scroll.js';
</script>

<style lang="scss" scope>
.menu {
  margin-right: auto;
  margin-left: rem(14px);

  @include mobile {
    display: none;
  }

  &-item {
    text-decoration: none;
    color: map-get($theme-color, 'white');
    font-size: rem(16px);
    text-transform: uppercase;
    transition: color, 0.5s;
    padding: 0 rem(12.5);
    font-weight: bold;

    &:hover,
    &.active {
      color: map-get($theme-color, 'active');
    }

    @include mobile {
      padding: 0;
      width: 100%;
      padding: rem(10px) 0;
      display: inline-block;
    }
  }
}
</style>
