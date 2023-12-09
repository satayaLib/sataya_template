<template>
  <RouterLink to="/" :class="`logo logo--${size}`" />
</template>

<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  size: {
    type: String,
    default: 'lg',
    validator(value) {
      return ['lg', 'sm'].includes(value);
    }
  }
});
</script>

<style lang="scss" scope>
.logo {
  display: block;
  background: url(@assets/logo.png) no-repeat center center/100% auto;

  &--lg {
    width: rem(139px);
    height: rem(106px);
    @include mobile {
      width: rem(66px);
      height: rem(50px);
    }
  }

  &--sm {
    width: rem(73px);
    height: rem(55px);

    @include mobile {
      width: rem(73px);
      height: rem(55px);
    }
  }
}
</style>
