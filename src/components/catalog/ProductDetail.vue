<template>
  <div class="product-detail">
    <div class="product-detail-images">
      <img
        v-for="item in product.images"
        :key="item"
        :src="item.image"
        :class="product.images.length > 1 ? 'product-detail-more-image' : ''"
      />
    </div>
    <h3>
      {{ product.name_ru }}
    </h3>

    <div class="product-detail-set" v-if="product.items.length > 1">
      <div class="product-detail-set__item" v-for="(item, index) in product.items" :key="index">
        <img :src="item.images[0].image" />
        <div class="product-detail-set__count">
          {{ item.count }}
        </div>
      </div>
    </div>

    <div class="product-detail-text">
      <p v-html="product.description_ru.replace(/[\r\n]/g, '<br>')"></p>

      <br />
      <template v-if="product.items.length === 1 && product.items[0].level > 0">
        Уровень дино: {{ product.items[0].level }}
      </template>
      <template v-if="product.items.length === 1 && product.items[0].quality > 0">
        Качество: {{ product.items[0].quality }}
      </template>
    </div>
    <div class="product-detail-price">
      <span class="product-detail-count">
        Цена
        {{ new Intl.NumberFormat('ru-RU').format(product.price * count) }}
        &nbsp;<IconMoney />
      </span>
      <CounterBlock
        :packing="packing"
        :count="countInCart ? countInCart / packing : 1"
        :disabled="countInCart ? true : false"
        @change="(total) => (count = total / packing)"
      />
    </div>
    <div class="product-detail-actions">
      <button
        v-if="!countInCart"
        class="modal-btn"
        @click="
          $emit('onClick', {
            isOpenDetail: false,
            count: count * packing,
            product: product
          })
        "
      >
        Купить
      </button>
      <button v-if="countInCart" class="modal-btn modal-btn--disabled">В корзине</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import IconMoney from '@icons/IconMoney.vue';
import CounterBlock from '@/components/CounterBlock.vue';

const props = defineProps({
  product: {
    type: Object,
    require: true
  },
  count: {
    type: Number,
    require: true
  },
  countInCart: {
    type: Number,
    require: true
  }
});

const $emit = defineEmits(['onClick']);

const packing = computed(() => (props.product.items.length > 1 ? 1 : props.product.items[0].count));
</script>

<style lang="scss" scope>
.product-detail {
  width: rem(375px);

  @include mobile {
    width: 100%;
  }

  &-actions {
    text-align: center;
  }

  &-images {
    height: rem(185px);
    overflow: hidden;
    display: flex;
    box-sizing: border-box;
    padding: rem(10px 0);

    img {
      flex: none;
      width: 100%;
      height: 100%;
      object-fit: contain;
      transition: transform 0.5s;
    }

    &:hover {
      border-color: lighten(map-get($theme-color, 'active'), 10);
      img.product-detail-more-image {
        transform: translateX(-100%);
      }
    }
  }

  h3 {
    font-size: rem(20px);
    font-weight: normal;
    line-height: 1.25;
    margin: 0;
    padding: rem(10px 0);
    text-align: center;
  }

  &-set {
    padding: rem(10px) 0;
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-gap: rem(10px);
    align-items: center;

    &__item {
      text-align: center;
      position: relative;
      border: rem(1px) solid map-get($theme-color, 'blockBorder');
      border-radius: rem(10px);
      padding-top: 100%;

      img {
        width: 85%;
        height: 85%;
        object-fit: contain;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
      }
    }
    &__count {
      font-size: rem(14.5px);
      position: absolute;
      right: rem(10px);
      bottom: rem(10px);
    }
  }

  &-text {
    padding: rem(5px) 0;
    font-size: rem(16px);
    line-height: 1.4em;

    p {
      padding: rem(5px) 0;
      margin: 0;
    }
  }

  &-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: rem(10px) 0;

    @include mobile {
      flex-direction: column;
    }
  }

  &-count {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: rem(15.5px);
    padding: rem(15px) 0;
    margin: 0;

    svg {
      fill: map-get($theme-color, 'white');
      width: rem(16px);
      height: rem(16px);
    }
  }
}
</style>
