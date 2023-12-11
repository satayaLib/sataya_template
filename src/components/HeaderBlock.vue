<template>
  <header class="header">
    <div class="header-container">
      <LogoBlock />
      <MenuBlock />
      <RouterLink to="/cart" class="header-cart">
        <IconCart />
        <span>{{ storeCart.total }}</span>
      </RouterLink>

      <button class="header-login">Войти</button>
      <button class="header-openmenu" @click="toggleMenu"><i></i></button>

      <div class="header-menu header-menu--mobile">
        <MenuBlock @click="toggleMenu" />

        <button class="header-login">Войти</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import IconCart from '@icons/IconMoney.vue';
import LogoBlock from '@/components/LogoBlock.vue';
import MenuBlock from '@/components/MenuBlock.vue';
import { useCartStore } from '@stores/cart';

const storeCart = useCartStore();

const toggleMenu = () => {
  document.body.classList.toggle('open-menu');
};
</script>

<style lang="scss">
.header {
  $header: &;
  width: 100%;
  padding: rem(10px) 0;
  z-index: 2;

  &-container {
    @include container;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &-cart {
    display: inline-flex;
    align-items: center;
    font-size: rem(16px);
    color: map-get($theme-color, 'white');
    fill: map-get($theme-color, 'white');
    text-decoration: none;
    margin: 0 rem(25px) 0 auto;
    transition: color, 0.5s;
    z-index: 2;

    svg {
      width: rem(39px);
      height: rem(29px);
      fill: currentColor;
      margin-right: rem(8px);

      @include mobile {
        width: rem(23px);
        height: rem(21px);
      }
    }

    &:hover {
      color: map-get($theme-color, 'active');
    }
  }

  &-login {
    position: relative;
    height: rem(50px);
    padding: 0 rem(30px);
    margin: 0;
    border-radius: rem(5px);
    display: inline-flex;
    align-items: center;

    font-size: rem(20px);
    line-height: 1;
    font-weight: 900;
    color: map-get($theme-color, 'white');
    text-shadow: $text-shadow;
    border: rem(1px) solid map-get($theme-color, 'active');
    text-decoration: none;
    background: $bg-circle;
    transition:
      background-color 0.5s,
      border-color 0.5s;

    @include mobile {
      height: rem(40px);
      font-size: rem(16px);
      margin: 0 auto;
    }

    cursor: pointer;

    &:hover {
      background: darken(map-get($theme-color, 'active'), 20%);
      border-color: lighten(map-get($theme-color, 'active'), 50%);
    }

    @include mobile {
      display: none;
    }
  }

  &-openmenu {
    display: none;
    padding: 0;
    margin: 0;
    width: rem(30px);
    height: rem(16px);
    background: none;
    cursor: pointer;
    border: none;
    position: relative;
    color: map-get($theme-color, 'white');
    transition: color 0.5s;
    z-index: 2;

    &:hover {
      color: map-get($theme-color, 'active');
    }

    &:before,
    &:after,
    i {
      content: '';
      height: rem(2px);
      background: currentColor;
      position: absolute;
      right: 0;
      left: 0;
    }

    &:before {
      top: 0;
    }
    &:after {
      top: 0;
      bottom: 0;
      margin: auto;
    }
    i {
      left: 20%;
      bottom: 0;
    }

    @at-root .open-menu #{&} {
      i {
        display: none;
      }
      &:before {
        transform: rotate(45deg);
        bottom: 0;
        margin: auto;
      }
      &:after {
        transform: rotate(-45deg);
      }
    }

    @include mobile {
      display: block;
    }
  }

  &-menu--mobile {
    display: none;

    position: fixed;
    left: rem(-10px);
    top: 0;
    right: rem(-10px);
    bottom: 0;
    overflow-y: auto;
    background: map-get($theme-color, 'block');
    padding: rem(60px) rem(24px);

    nav {
      border-bottom: rem(1px) solid map-get($theme-color, 'light');
      padding-bottom: rem(10px);
      margin-bottom: rem(10px);
      display: block;
    }

    #{$header} {
      &-login {
        display: block;
      }
    }

    @include mobile {
      @at-root .open-menu #{&} {
        display: block;
      }
    }
  }
}
</style>
