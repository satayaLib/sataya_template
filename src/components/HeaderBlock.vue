<template>
  <header class="header">
    <div class="header-container">
      <LogoBlock />
      <MenuBlock />
      <RouterLink to="/cart" class="header-cart">
        <IconCart />
        <span>{{ storeCart.total }}</span>
      </RouterLink>

      <button v-if="!storeProfile.profile" class="header-login" @click="openAuth = true">
        Войти
      </button>
      <div class="header-user" v-if="storeProfile.profile">
        <div class="header-user__nickname">{{ storeProfile.profile.nickname }}</div>
        <div class="header-user__avatar">
          <img v-if="storeProfile.profile.avatar" :src="storeProfile.profile.avatar" />
        </div>
        <ul class="header-user__menu">
          <li>
            <a href="#" @click="openBalance = true">
              <span>
                Баланс: {{ new Intl.NumberFormat('ru-RU').format(storeProfile.balance) }}
              </span>
              <IconMoney />
            </a>
          </li>
          <li>
            <a href="#" @click="storeProfile.logout">Выйти</a>
          </li>
        </ul>
      </div>
      <button class="header-openmenu" @click="toggleMenu"><i></i></button>

      <div class="header-menu header-menu--mobile">
        <MenuBlock @click="toggleMenu" />

        <button v-if="!storeProfile.profile" class="header-login" @click="openAuth = true">
          Войти
        </button>
      </div>
    </div>
  </header>
  <ModalBlock v-if="openAuth && !storeProfile.profile" @close="openAuth = false">
    <AuthBlock />
  </ModalBlock>
  <ModalBlock v-if="openBalance && storeProfile.profile" @close="openBalance = false">
    <BalanceBlock />
  </ModalBlock>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import IconCart from '@icons/IconCart.vue';
import IconMoney from '@icons/IconMoney.vue';
import LogoBlock from '@/components/LogoBlock.vue';
import MenuBlock from '@/components/MenuBlock.vue';
import ModalBlock from '@/components/ModalBlock.vue';
import AuthBlock from '@/components/AuthBlock.vue';
import BalanceBlock from '@/components/BalanceBlock.vue';
import { useCartStore } from '@stores/cart';
import { useProfileStore } from '@stores/profile';

const storeCart = useCartStore();
const storeProfile = useProfileStore();

const openAuth = ref(false);
const openBalance = ref(false);

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

  &-user {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-left: rem(30px);
    position: relative;
    color: map-get($theme-color, 'white');
    transition: color 0.5s;

    padding: rem(5px) 0;

    &:hover {
      color: map-get($theme-color, 'active');
    }
    &:hover &__menu {
      opacity: 1;
      visibility: visible;
      z-index: 99;
    }

    &__nickname {
      max-width: rem(120px);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: rem(20px);
      letter-spacing: rem(0.6px);
      color: inherit;
      margin: 0 rem(10px) 0 0;
      text-decoration: none;

      @include mobile {
        margin: 0 0 0 rem(10px);
      }
    }
    &__avatar {
      width: rem(41px);
      height: rem(41px);
      border: rem(1px) solid map-get($theme-color, 'active');
      background: map-get($theme-color, 'block');
      border-radius: 50%;
      box-sizing: border-box;
      overflow: hidden;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      text-decoration: none;

      @include mobile {
        width: rem(30px);
        height: rem(30px);
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      svg {
        height: 90%;
        object-fit: cover;
        fill: map-get($theme-color, 'white');
      }
    }

    &__menu {
      box-sizing: border-box;
      width: auto;
      background: transparentize(map-get($theme-color, 'block'), 0.1);
      list-style: none;
      padding: rem(10px) rem(22px);
      margin: 0;
      position: absolute;
      top: 100%;
      right: 0;
      border: rem(1px) solid map-get($theme-color, 'blockBorder');
      border-radius: rem(5px);
      font-size: rem(18px);
      color: map-get($theme-color, 'white');
      opacity: 0;
      visibility: hidden;
      z-index: 0;

      transition:
        opacity 0.5s,
        visibility 0.5s;

      li {
        padding: rem(10px) 0;
        display: flex;
        color: inherit;
        white-space: nowrap;
        letter-spacing: rem(0.54px);

        &:last-child {
          border-top: rem(1px) solid map-get($theme-color, 'blockBorder');
        }
      }

      a {
        text-decoration: none;
        color: inherit;
        transition: color 0.5s;

        &:hover {
          color: map-get($theme-color, 'active');
        }
      }

      svg {
        width: rem(20px);
        height: rem(20px);
        fill: currentColor;
        margin-left: rem(10px);
        transition: fill 0.5s;
      }
    }

    @include mobile {
      display: none;
    }

    &--mobile {
      display: none;
      margin: 0;

      @include mobile {
        display: flex;
      }
    }
  }
}
</style>
