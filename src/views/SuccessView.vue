<template>
  <section class="success">
    <h1>Баланс успешно пополнен</h1>
    <hr />
  </section>
</template>

<style lang="scss" scoped>
.success {
  @include container;
  text-align: center;
  color: map-get($theme-color, 'white');

  h1 {
    font-size: rem(40px);
  }
}
</style>
