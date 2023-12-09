<template>
  <article class="product">
    <div class="product-image">
      <img :src="product.images[0].image" />
    </div>
    <h3 class="product-name">{{ product.name_ru }}</h3>
    <p class="product-price">
      Цена:
      {{ new Intl.NumberFormat('ru-RU').format(product.price * count) }}&nbsp;
      <IconMoney />
    </p>
    <CounterBlock :packing="packing" :count="1" @change="(total) => (count = total / packing)" />

    <button class="product-btn" @click="$emit('onClick', isSet)">
      <template v-if="!isSet">Купить</template>
      <template v-if="isSet">Подробнее</template>
    </button>
  </article>
</template>

<script setup>
import { ref, computed } from 'vue';
import IconMoney from '@icons/IconMoney.vue';
import CounterBlock from '@/components/CounterBlock.vue';

const props = defineProps({
  product: {
    type: Object,
    require: true
  }
});

const $emit = defineEmits(['onClick']);

const count = ref(1);
const packing = computed(() => (props.product.items.length > 1 ? 1 : props.product.items[0].count));
const isSet = computed(() => props.product.items.length > 1);
</script>

<style lang="scss" scope>
.product {
  $block: &;

  width: 100%;
  max-width: rem(232px);
  background: map-get($theme-color, 'block');
  border: rem(2px) solid map-get($theme-color, 'block');
  border-radius: rem(10px);
  box-sizing: border-box;
  padding: rem(25px 20px);
  position: relative;
  color: map-get($theme-color, 'white');
  transition: border-color 0.5s;
  text-align: center;
  display: flex;
  flex-direction: column;

  &-count {
    font-size: rem(15px);
    color: map-get($theme-color, 'active');
    background: map-get($theme-color, 'white');
    padding: rem(5px 3px);
    border-radius: rem(3px);
    box-shadow: 0 rem(2px) 0 0 rgba(map-get($theme-color, 'active'), 0.96);
    position: absolute;
    top: rem(8px);
    right: rem(8px);
  }

  &-image {
    height: rem(120px);
    overflow: hidden;

    img {
      flex: none;
      width: 100%;
      height: 100%;
      object-fit: contain;
      transition: transform 0.5s;
    }
  }

  &-name {
    font-size: rem(16px);
    font-weight: normal;
    line-height: 1.25;
    padding: 0;
    margin: rem(20px 0);
    min-height: rem(40);
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  &-price {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: rem(15.5px);
    padding: rem(15px) 0;
    margin: 0 0 auto 0;
    border-top: rem(1px) solid rgba(map-get($theme-color, 'light'), 0.25);

    svg {
      fill: map-get($theme-color, 'white');
      width: rem(16px);
      height: rem(16px);
    }
  }

  &-btn {
    line-height: rem(36px);
    border-radius: rem(5px);
    font-size: rem(14.5px);
    min-width: 80%;
    font-weight: bold;
    text-transform: uppercase;
    border: none;
    background: lighten(map-get($theme-color, 'active'), 5);
    display: inline-block;
    margin-top: rem(20px);
    padding: 0 rem(20px);
    color: inherit;
    cursor: pointer;
    transition: background-color 0.5s;

    &:hover {
      background: map-get($theme-color, 'active');
    }
  }

  &:hover {
    border-color: lighten(map-get($theme-color, 'active'), 10);
    img#{$block}-more-image {
      transform: translateX(-100%);
    }
  }
}
</style>
