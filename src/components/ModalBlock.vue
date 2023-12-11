<template>
  <div class="modal" @click.self="close">
    <div class="modal-wrapper">
      <div class="modal-container">
        <button class="modal-close" @click="close">
          <IconClose />
        </button>
        <div class="modal-body">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import IconClose from '@icons/IconClose.vue';

onMounted(() => {
  document.body.classList.add('modal-open');
});

const $emit = defineEmits(['close']);

const close = () => {
  document.body.classList.remove('modal-open');
  return $emit('close');
};
</script>

<style lang="scss" scope>
body.modal-open {
  overflow: hidden;
}
.modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparentize(map-get($theme-color, 'block'), 0.4);
  display: grid;
  align-items: center;
  justify-content: center;
  overflow: scroll;

  &-center {
    text-align: center;
  }

  &-wrapper {
    width: fit-content;
    display: table-cell;
    vertical-align: middle;
    margin: rem(40px 0);
    color: map-get($theme-color, 'white');
    font-size: rem(16px);

    @include mobile {
      max-width: rem(300px);
    }
  }

  &-container {
    width: fit-content;
    margin: 0 auto;
    padding: rem(20px);
    background: map-get($theme-color, 'block');
    border: rem(1px) solid map-get($theme-color, 'blockBorder');
    border-radius: rem(10px);
    transition: all 0.3s ease;
    position: relative;
    box-sizing: border-box;

    min-width: rem(300px);
    max-width: rem(570px);
  }
  &-close {
    position: absolute;
    right: rem(11px);
    top: rem(11px);
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    cursor: pointer;
    transition: color 0.5s;
    color: currentColor;

    &:hover {
      color: map-get($theme-color, 'active');
    }

    svg {
      fill: currentColor;
      width: rem(13px);
      height: rem(13px);
    }
  }

  h2 {
    font-size: rem(20px);
    padding: rem(10px) 0;
    margin: 0;
  }

  p {
    font-size: rem(16px);
    margin: 0;
    padding: rem(10px) 0;
  }

  &-error {
    color: map-get($theme-color, 'error');
  }

  &-input {
    width: 100%;
    box-sizing: border-box;
    height: rem(45px);
    border: rem(2px) solid map-get($theme-color, 'blockBorder');
    background: none;
    font-size: rem(16px);
    padding: 0 rem(10px);
    color: map-get($theme-color, 'white');
    margin: rem(10px) 0;
    outline: none;
  }

  &-btn {
    height: rem(45px);
    padding: 0 rem(45px);
    margin: rem(10px) 0;
    border-radius: rem(5px);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;

    font-size: rem(16px);
    text-transform: uppercase;
    font-weight: bold;
    line-height: 1;
    color: map-get($theme-color, 'white');
    border: none;
    background: map-get($theme-color, 'active');
    transition:
      background-color 0.5s,
      border-color 0.5s;

    cursor: pointer;

    &:hover {
      background: darken(map-get($theme-color, 'active'), 20%);
    }

    &--disabled {
      background: lighten(map-get($theme-color, 'light'), 5);

      &:hover {
        background: map-get($theme-color, 'light');
      }
    }
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transform: scale(1.1);
}
</style>
