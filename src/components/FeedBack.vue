<template>
  <div :class="`feedback feedback--bg${typeBg}`">
    <div class="feedback-container">
      <h2>Связь</h2>
      <p>
        Написать модераторам<br />
        или админам можно в Discord.
      </p>
      <a class="feedback-link" href="https://discord.gg/FszYUdSyHM" target="_blank">
        <IconDiscord />
        Наш Discord
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import IconDiscord from '@icons/IconDiscord.vue';
import { useRoute } from 'vue-router';

const $route = useRoute();

const typeBg = computed(() => {
  if ($route.name === 'shop') return 2;
  if ($route.name === 'cart') return 3;

  return 'default';
});
</script>

<style lang="scss" scope>
.feedback {
  width: 100%;
  padding: rem(10px) 0 rem(595px) 0;
  background: url(@assets/feedback/bg-image.jpg) no-repeat center bottom/auto rem(652px);
  text-align: center;
  color: map-get($theme-color, 'white');

  @include mobile {
    padding: rem(10px) 0 rem(231px) 0;
    background: url(@assets/feedback/bg-image-mobile.jpg) no-repeat center bottom/100% auto;
  }

  &-container {
    @include container;
  }

  &--bg2 {
    background: url(@assets/feedback/bg-image-2.jpg) no-repeat center bottom/auto 100%;
    padding-bottom: rem(400px);
    text-align: left;

    @include mobile {
      background: url(@assets/feedback/bg-image-2-mobile.jpg) no-repeat center bottom/100% auto;
      padding-bottom: rem(240px);
      text-align: center;
    }
  }

  &--bg3 {
    background: url(@assets/feedback/bg-image-3.jpg) no-repeat center bottom/auto 100%;
    padding-bottom: rem(400px);
    text-align: left;

    @include mobile {
      background: url(@assets/feedback/bg-image-3-mobile.jpg) no-repeat center bottom/100% auto;
      padding-bottom: rem(220px);
      text-align: center;
    }
  }

  &-link {
    position: relative;
    height: rem(60px);
    padding: 0 rem(35px);
    margin: rem(20px) 0;
    border-radius: rem(5px);
    display: inline-flex;
    align-items: center;

    font-size: rem(23.5px);
    text-transform: uppercase;
    line-height: 1;
    font-weight: 900;
    color: map-get($theme-color, 'white');
    border: 1px solid map-get($theme-color, 'active');
    background: $bg-circle;
    text-decoration: none;

    transition:
      background-color 0.5s,
      border-color 0.5s;

    @include mobile {
      height: rem(45px);
      padding: 0 rem(10px);
      margin: rem(10px) 0;

      font-size: rem(16px);
      line-height: rem(49px);
    }

    svg {
      width: rem(35px);
      height: rem(27px);
      margin-right: rem(15px);
      fill: currentColor;

      @include mobile {
        width: rem(22px);
        height: rem(17px);
      }
    }

    &:hover {
      background: darken(map-get($theme-color, 'active'), 20%);
      border-color: lighten(map-get($theme-color, 'active'), 50%);
    }
  }

  h2 {
    padding: rem(10px) 0;
    margin: 0;
    font-size: rem(37px);
    font-weight: 900;
    text-transform: uppercase;

    @include mobile {
      font-size: rem(20px);
      letter-spacing: rem(0.6px);
    }
  }

  p {
    padding: rem(20px) 0;
    margin: 0;
    font-size: rem(24px);

    @include mobile {
      padding: rem(10px) rem(30px);
      font-size: rem(14px);
    }
  }
}

.feedback + .footer {
  position: absolute;
  bottom: 0;
}
</style>
