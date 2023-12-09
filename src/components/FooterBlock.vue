<template>
  <footer class="footer">
    <div class="footer-container">
      <LogoBlock size="sm" />
      <MenuBlock />
    </div>
    <div class="footer-container">
      <p>
        Размещенная на настоящем сайте информация носит исключительно информационный характер и ни
        при каких условиях не является публичной офертой, <br />
        определяемой положениями ч. 2 ст. 437 Гражданского кодекса Российской Федерации.
      </p>
    </div>
  </footer>
</template>

<script setup>
import LogoBlock from '@/components/LogoBlock.vue';
import MenuBlock from '@/components/MenuBlock.vue';
</script>

<style lang="scss" scope>
.footer {
  width: 100%;
  padding: rem(10px) 0;
  color: map-get($theme-color, 'white');
  font-size: rem(14px);

  @include mobile {
    font-size: rem(11px);
  }

  &-container {
    @include container;

    padding: rem(10px) 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include mobile {
      padding: rem(10px) rem(30px);
      justify-content: center;

      &:first-of-type {
        padding-bottom: 0;
      }
    }
  }

  p {
    font-size: inherit;
    margin: 0;
    padding: 0;

    @include mobile {
      text-align: center;

      br {
        display: none;
      }
    }
  }
}
</style>
