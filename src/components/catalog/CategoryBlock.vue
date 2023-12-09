<template>
  <ul class="category-items">
    <li class="category-item">
      <button
        class="category-item__name"
        :class="{
          active: activeCategory === false
        }"
        @click="openCategory(false)"
      >
        Все категории
      </button>
    </li>
    <li class="category-item" v-for="item in items" :key="item.id">
      <button
        class="category-item__name"
        :class="{
          active:
            activeCategory === item.id || item.children.find((elem) => elem.id == activeCategory)
        }"
        @click="openCategory(item.id)"
      >
        {{ item.name_ru }}

        <IconArrow v-if="item.children.length > 0" />
      </button>

      <ul class="category-items" v-if="item.children.length > 0">
        <li class="category-item" v-for="children in item.children" :key="children.id">
          <button
            class="category-item__name"
            :class="{
              active: activeCategory === children.id
            }"
            @click="openCategory(children.id)"
          >
            {{ children.name_ru }}
          </button>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue';
import IconArrow from '@icons/IconArrow.vue';

defineProps({
  items: {
    type: Array,
    default: () => []
  }
});

const $emit = defineEmits(['change']);

const activeCategory = ref(false);

const openCategory = (item) => {
  activeCategory.value = item;
  $emit('change', item);
};
</script>

<style lang="scss" scope>
.category {
  &-items {
    width: rem(221px);
    border-radius: rem(10px);
    border: rem(2px) solid map-get($theme-color, 'blockBorder');
    background-color: map-get($theme-color, 'block');
    padding: 0;
    margin: 0;
    list-style: none;
    overflow: hidden;

    ul {
      border: none;
      border-radius: 0;
      display: none;
    }

    ul button {
      padding-left: rem(40px);
    }
  }

  &-item {
    background: transparent;
    transition: background-color 0.2s;

    button {
      box-sizing: border-box;
      padding: 0 rem(25px);
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      line-height: rem(45px);
      text-decoration: none;
      background: none;
      cursor: pointer;
      color: map-get($theme-color, 'white');
      border: none;
      border-top: rem(1px) solid map-get($theme-color, 'blockBorder');
      font-size: inherit;
      font-family: inherit;

      &:hover,
      &.active {
        background: lighten(map-get($theme-color, 'block'), 10);

        svg {
          transform: rotate(90deg);
        }
      }

      &.active + ul {
        display: block !important;
      }
    }

    svg {
      fill: map-get($theme-color, 'light');
      width: rem(17px);
      height: rem(11px);
    }
  }
}
</style>
