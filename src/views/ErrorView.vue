<template>
  <section class="error">
    <h1>Страница не найдена</h1>
    <hr />
  </section>
</template>

<style lang="scss" scoped>
.error {
  @include container;
  text-align: center;
  color: map-get($theme-color, 'white');

  h1 {
    font-size: rem(40px);
  }
}
</style>
