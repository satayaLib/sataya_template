<template>
  <section :class="`banner ${className}`">
    <div class="banner-container">
      <h1 class="banner-title">
        <strong>SATAYA.RU</strong> - НАЧНИТЕ СВОЁ <br />ПРИКЛЮЧЕНИЕ ВМЕСТЕ С НАМИ
      </h1>
      <h2 class="banner-subtitle">ВАС ЖДЕТ:</h2>
      <ul class="banner-pros">
        <li>Оптимальные рейты для комфортной игры</li>
        <li>Внутриигровая валюта - кристаллы, <br />которые вы получаете за онлайн</li>
        <li>Широкий ассортимент товаров в магазине, <br />где можно найти все необходимое</li>
        <li>Поддержка администрацией в discord</li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';

const images = ['monster', 'tek'];
const className = computed(() => {
  const randImage = images[Math.floor(Math.random() * images.length)];
  return `banner--${randImage}`;
});
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  margin: 0 auto;
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  align-items: center;

  // костыль
  position: relative;
  margin-top: rem(-130px);
  margin-bottom: rem(10px);

  @include desktop {
    height: 100vh;
    max-height: rem(1052px);
    min-height: rem(650px);
  }

  @include mobile {
    margin-top: rem(-72px);
    margin-bottom: rem(30px);
    background-size: 100% auto;

    br {
      display: none;
    }
  }

  &-container {
    @include container;
  }

  &--tek {
    background-image: url(@assets/banner/bg-banner-tek.jpg);

    @include mobile {
      background-image: url(@assets/banner/bg-banner-tek-mobile.jpg);
    }
  }
  &--monster {
    background-image: url(@assets/banner/bg-banner-monster.jpg);

    @include mobile {
      background-image: url(@assets/banner/bg-banner-monster-mobile.jpg);
    }
  }

  &-title,
  &-subtitle {
    padding: rem(80px) 0 rem(20px) 0;
    margin: 0;
    font-size: rem(37px);
    font-weight: 900;
    line-height: 1.45;
    letter-spacing: rem(1.11px);
    color: map-get($theme-color, 'white');

    strong {
      font-weight: 900;
      color: map-get($theme-color, 'active');
    }

    @include mobile {
      padding: rem(290px) 0 rem(10px) 0;
      font-size: rem(16px);
      letter-spacing: rem(0.51px);
      word-wrap: break-word;
    }
  }

  &-subtitle {
    font-size: rem(32px);
    padding-top: 0;

    @include mobile {
      font-size: rem(16px);
    }
  }

  &-pros {
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: rem(22px);
    color: map-get($theme-color, 'white');
    line-height: 1.25;
    letter-spacing: rem(0.72px);

    @include mobile {
      font-size: rem(14px);
      letter-spacing: rem(0.42px);
    }

    li {
      position: relative;
      padding: rem(10px) 0;
      display: grid;
      grid-template-columns: auto 1fr;
      gap: rem(24px);

      @include mobile {
        padding: rem(10px) 0;
        gap: rem(15px);
      }

      &::before {
        content: '';
        width: rem(12px);
        height: rem(12px);
        background: map-get($theme-color, 'active');
        display: block;
        margin-top: rem(10px);

        @include mobile {
          width: rem(8px);
          height: rem(8px);
          margin-top: rem(5px);
        }
      }
    }
  }
}
</style>
