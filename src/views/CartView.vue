<template>
  <section class="cart">
    <h2>Корзина</h2>

    <p class="cart-empty" v-if="storeCart.items.length === 0">В корзине нет товаров</p>
    <template v-if="storeCart.items.length > 0">
      <div class="cart-container">
        <strong class="cart-col cart-col--5"> Товар </strong>
        <strong class="cart-col">Цена</strong>
        <strong class="cart-col cart-col--2">Количество</strong>
        <strong class="cart-col cart-col--2">Итого</strong>

        <template v-for="item in storeCart.items" :key="item.id">
          <div class="cart-col cart-col--position">
            <img class="cart-image" :src="item.images[0].image" />
            <button class="cart-delete--mobile">
              <IconClose />
            </button>
          </div>
          <div class="cart-col cart-col--4">
            <span>{{ item.name_ru }}</span>
          </div>
          <div class="cart-col">
            <span>
              {{ new Intl.NumberFormat('ru-RU').format(item.price) }}
            </span>
            <IconMoney class="cart-currency" />
          </div>
          <div class="cart-col cart-col--2">
            <CounterBlock
              :packing="item.packing"
              :count="item.count / item.packing"
              @change="(total) => storeCart.updateCount(item, total)"
            />
          </div>
          <div class="cart-col cart-col--2 cart-col--justify">
            <strong class="cart-price">Цена:</strong>
            <span>{{
              new Intl.NumberFormat('ru-RU').format((item.count / item.packing) * item.price)
            }}</span>
            <IconMoney class="cart-currency" />
            <button class="cart-delete" @click="storeCart.removeItem(item.id)">
              <IconClose />
            </button>
          </div>
        </template>
        <div class="cart-col cart-col--all">
          <strong
            >Итоговая стоимость:
            {{ new Intl.NumberFormat('ru-RU').format(storeCart.totalPrice) }}</strong
          >
          <IconMoney class="cart-currency" />
        </div>
      </div>
      <p class="cart-error">
        ВАЖНО! Будьте готовы получить заказ - приготовьте ящики для хранения.<br />
        В случае заказа дино, подготовьте безопасное место возле себя.
      </p>
      <button
        class="cart-order"
        :class="loader ? 'cart-order--loader' : ''"
        v-if="storeCart.items.length > 0"
        @click="createOrder"
      >
        Получить
      </button>
      <p class="cart-error" v-if="error">
        {{ error }}
      </p>
    </template>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import IconClose from '@icons/IconClose.vue';
import IconMoney from '@icons/IconMoney.vue';
import CounterBlock from '@/components/CounterBlock.vue';
import { useCartStore } from '@stores/cart';
import { useProfileStore } from '@stores/profile';

const storeCart = useCartStore();
const storeProfile = useProfileStore();

const loader = ref(false);
const error = ref(false);

const createOrder = async () => {
  loader.value = true;
  error.value = false;

  const res = await storeProfile.createOrder(storeCart.orderFormatItems);

  if (res.status !== 200) {
    loader.value = false;
    error.value = res.data.message;
    return;
  }

  storeCart.removeAll();
  loader.value = false;
  storeProfile.getBalance();
};
</script>

<style lang="scss" scope>
.cart {
  @include container;

  color: map-get($theme-color, 'white');
  font-size: rem(16px);
  margin-bottom: rem(25px);

  @include mobile {
    font-size: rem(16px);
    text-align: center;
  }

  h2 {
    padding: rem(10) 0;
    margin: 0;
    font-size: rem(37px);
    font-weight: 900;
    text-transform: uppercase;

    @include mobile {
      font-size: rem(20px);
    }
  }

  &-container {
    position: relative;
    background: map-get($theme-color, 'block');
    border: rem(2px) solid map-get($theme-color, 'blockBorder');
    border-radius: rem(10px);
    margin: rem(10px) 0;
    display: grid;
    grid-template-columns: repeat(10, 10%);

    @include mobile {
      grid-template-columns: 100%;
    }
  }

  &-empty {
    font-size: rem(18px);
    margin: 0;
    padding: rem(10px) 0;
  }

  strong {
    font-size: rem(18px);
    letter-spacing: rem(0.8px);

    @include mobile {
      font-size: rem(16px);
    }
  }

  &-col {
    padding: rem(15px);
    box-sizing: border-box;
    border-top: rem(1px) solid map-get($theme-color, 'blockBorder');
    display: flex;
    align-items: center;

    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4) {
      border: none;

      @include mobile {
        display: none;
      }
    }

    &--justify {
      display: flex;
      & > *:last-child {
        margin-left: auto;
      }

      @include mobile {
        border-bottom: rem(1px) solid map-get($theme-color, 'blockBorder');
      }
    }

    @include desktop {
      &--2 {
        grid-column: span 2;
      }
      &--3 {
        grid-column: span 3;
      }
      &--4 {
        grid-column: span 4;
      }
      &--5 {
        grid-column: span 5;
      }
      &--6 {
        grid-column: span 6;
      }
      &--all {
        grid-column: span 10;
      }
    }

    @include mobile {
      justify-content: center;
      border-top: none;

      &--position {
        position: relative;
      }

      &--4 + & {
        display: none;
      }
    }
  }

  &-currency {
    width: rem(18px);
    height: rem(18px);
    fill: map-get($theme-color, 'white');
    margin-left: rem(5px);
  }

  &-image {
    width: auto;
    height: rem(80px);
  }

  &-delete {
    background: none;
    border: none;
    color: map-get($theme-color, 'white');
    transition: color 0.5s;
    cursor: pointer;

    &:hover {
      color: map-get($theme-color, 'active');
    }
    svg {
      width: rem(15px);
      height: rem(15px);
      fill: currentColor;
    }

    @include mobile {
      display: none;
    }

    &--mobile {
      position: absolute;
      top: rem(15px);
      right: rem(15px);
      background: none;
      border: none;
      color: map-get($theme-color, 'white');
      transition: color 0.5s;
      cursor: pointer;

      &:hover {
        color: map-get($theme-color, 'active');
      }
      svg {
        width: rem(15px);
        height: rem(15px);
        fill: currentColor;
      }

      @include desktop {
        display: none;
      }
    }
  }

  &-price {
    margin-right: rem(5px);

    @include desktop {
      display: none;
    }
  }

  &-order {
    line-height: rem(40px);
    border-radius: rem(5px);
    font-size: rem(16px);
    font-weight: bold;
    text-transform: uppercase;
    border: none;
    background: lighten(map-get($theme-color, 'active'), 5);
    display: inline-block;
    margin: rem(10px) 0;
    padding: 0 rem(20px);
    color: inherit;
    cursor: pointer;
    transition: background-color 0.5s;

    &:hover {
      background: map-get($theme-color, 'active');
    }

    &--loader {
      background: lighten(map-get($theme-color, 'light'), 5) !important;
    }
  }

  &-error {
    color: map-get($theme-color, 'error');
  }
}
</style>
