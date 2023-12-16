<template>
  <div class="auth">
    <h2>Войти через:</h2>
    <a :href="storeProfile.steamAuthUrl" class="auth-steam">
      <IconSteam />
    </a>
    <div class="auth-line">
      <span>ИЛИ</span>
    </div>
    <h2>Войти через код:</h2>
    <p>Войдите на наш сервер <br />и введите в игровой чат: /auth</p>
    <p>Введите полученный код ниже:</p>
    <form class="auth-code">
      <input class="modal-input" v-model="code" />
      <button
        class="modal-btn"
        :class="{
          'modal-btn--disabled': loader
        }"
        :disabled="loader"
        @click="authCode"
      >
        Войти
      </button>
    </form>
    <p class="modal-error" v-if="error">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import IconSteam from '@icons/IconSteam.vue';
import { useProfileStore } from '@stores/profile';
const storeProfile = useProfileStore();

const $emit = defineEmits('success');

const code = ref('');
const loader = ref(false);
const error = ref(false);

const authCode = async (e) => {
  e.preventDefault();

  if (code.value.length < 3) {
    return false;
  }
  error.value = false;
  loader.value = true;
  const res = await storeProfile.authCode(code.value);

  if (res.status !== 200) {
    error.value = res.data.message;
    loader.value = false;
    return false;
  }

  return $emit('success');
};
</script>

<style lang="scss" scope>
.auth {
  width: 100%;
  text-align: center;

  &-steam {
    position: relative;
    height: rem(45px);
    padding: 0;
    width: rem(220px);
    margin: rem(10px) 0;
    border-radius: rem(5px);
    display: inline-flex;
    align-items: center;
    justify-content: center;

    line-height: 1;
    color: map-get($theme-color, 'white');
    border: rem(1px) solid map-get($theme-color, 'active');
    background: $bg-circle;
    transition:
      background-color 0.5s,
      border-color 0.5s;

    cursor: pointer;

    svg {
      width: rem(98px);
      height: rem(30px);
      fill: currentColor;
    }

    &:hover {
      background: darken(map-get($theme-color, 'active'), 20%);
      border-color: lighten(map-get($theme-color, 'active'), 50%);
    }
  }
  &-code {
    width: rem(220px);
    margin: 0 auto;
  }

  &-line {
    padding: rem(20px) 0;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      height: rem(1px);
      background: map-get($theme-color, 'blockBorder');
    }

    span {
      position: relative;
      z-index: 2;
      padding: 0 rem(10px);
      background: map-get($theme-color, 'block');
    }
  }
}
</style>
