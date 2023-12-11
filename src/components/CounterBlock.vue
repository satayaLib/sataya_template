<template>
  <div
    class="counter"
    :class="{
      'counter--disabled': disabled
    }"
  >
    <button class="counter-minus" @click="change(-1)">-</button>
    <input class="counter-input" :value="total" disabled />
    <button class="counter-plus" @click="change(1)">+</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  packing: {
    type: Number,
    require: true
  },
  count: {
    type: Number,
    require: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const $emit = defineEmits(['change']);

const total = ref(props.count * props.packing);

const change = (direction = 1) => {
  if (props.disabled) {
    return;
  }

  if (direction === -1) {
    if (total.value - props.packing >= props.packing) {
      total.value -= props.packing;
    }
  }
  if (direction === 1) {
    total.value += props.packing;
  }

  $emit('change', total.value);
};
</script>

<style lang="scss" scope>
.counter {
  display: flex;
  justify-content: center;
  font-size: rem(18px);
  color: map-get($theme-color, 'white');

  &--disabled &-minus,
  &--disabled &-plus {
    border: rem(1px) solid map-get($theme-color, 'blockBorder') !important;
    cursor: default;
  }

  &-minus,
  &-plus {
    width: rem(35px);
    height: rem(35px);
    font-size: inherit;
    display: flex;
    flex: 0 0 rem(35px);
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    background: none;
    color: inherit;
    border: rem(1px) solid map-get($theme-color, 'blockBorder');
    border-radius: rem(5px);
    line-height: 0;
    transition: border-color 0.5s;
    cursor: pointer;

    &:hover {
      border-color: lighten(map-get($theme-color, 'active'), 10);
    }
  }

  &-input {
    background: none;
    height: rem(35px);
    padding: 0 rem(10px);
    width: rem(60px);
    flex: 0;
    border: none;
    color: inherit;
    font-size: inherit;
    text-align: center;
  }
}
</style>
