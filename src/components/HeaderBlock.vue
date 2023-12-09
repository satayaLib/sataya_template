<template>
  <header class="header">
    <div class="header-container">
      <LogoBlock />
      <MenuBlock />
    </div>
  </header>
</template>

<script setup>
import LogoBlock from '@/components/LogoBlock.vue';
import MenuBlock from '@/components/MenuBlock.vue';
</script>

<style lang="scss">
.header {
  width: 100%;
  padding: rem(10px) 0;
  z-index: 2;

  &-container {
    @include container;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
