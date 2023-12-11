<template>
  <div class="filter">
    <form class="filter-search" @submit.prevent="loadProduct">
      <input class="filter-search__input" type="search" v-model="searchModel" minlength="3" />
      <button class="filter-search__submit" type="submit">
        <IconSearch />
      </button>
    </form>
  </div>
  <section class="catalog">
    <aside class="catalog-aside">
      <CategoryBlock :items="storeCategories.categories" @change="setCategory" />
    </aside>
    <div class="catalog-content">
      <div class="catalog-items">
        <template v-for="product in storeProducts.products" :key="product.id">
          <ProductItem
            :product="product"
            :countInCart="storeCart.getCount(product.id)"
            @onClick="(detail) => openModal(detail, product)"
          />
        </template>
        <p
          class="catalog-error"
          v-if="storeProducts.products.length === 0 && storeProducts.isLoaded"
        >
          Ничего не найдено
        </p>
      </div>
      <VPagination
        v-model="page"
        :pages="storeProducts.total"
        activeColor=""
        @update:modelValue="loadProduct"
        v-if="storeProducts.total > 1"
      />
    </div>
  </section>

  <ModalBlock v-if="detailModal.product" @close="detailModal.product = false">
    <ProductDetail
      :product="detailModal.product"
      :count="detailModal.count"
      :countInCart="storeCart.getCount(detailModal.product.id)"
      @onClick="openCallback"
    />
  </ModalBlock>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import CategoryBlock from '@/components/catalog/CategoryBlock.vue';
import IconSearch from '@icons/IconSearch.vue';
import ProductItem from '@/components/catalog/ProductItem.vue';
import VPagination from '@hennge/vue3-pagination';
import ModalBlock from '@/components/ModalBlock.vue';
import ProductDetail from '@/components/catalog/ProductDetail.vue';

import { useCategoriesStore } from '@stores/categories';
import { useProductsStore } from '@stores/products';
import { useCartStore } from '@stores/cart';

const storeCategories = useCategoriesStore();
const storeProducts = useProductsStore();
const storeCart = useCartStore();

onMounted(() => {
  storeCategories.load();
  loadProduct();
});

const activeCategoryId = ref(false);
const searchModel = ref('');
const page = ref(1);

const detailModal = reactive({
  product: false,
  count: 1
});

const setCategory = (id) => {
  activeCategoryId.value = id;
  loadProduct();
};

const loadProduct = () => {
  const filter = {};
  if (activeCategoryId.value) {
    filter.category = activeCategoryId.value;
  }

  return storeProducts.load(searchModel.value, filter, page.value);
};

const openModal = (data, product) => {
  if (!data.isOpenDetail) {
    return openCallback({
      count: data.count,
      product
    });
  }

  detailModal.product = product;
  detailModal.count = data.count;
};

const openCallback = ({ count, product }) => {
  storeCart.updateCount(product, count);
};
</script>

<style lang="scss" scope>
.filter {
  @include container;
  display: flex;
  justify-content: flex-start;

  @include mobile {
    margin: rem(20px) 0;
    justify-content: center;
  }

  &-search {
    box-sizing: border-box;
    max-width: rem(365px);
    height: rem(45px);
    border-radius: rem(10px);
    border: rem(2px) solid map-get($theme-color, 'blockBorder');
    position: relative;
    overflow: hidden;
    transition: border-color 0.5s;
    background: map-get($theme-color, 'block');

    @include mobile {
      height: rem(36px);
      border-radius: rem(5px);
    }

    &:hover {
      border-color: lighten(map-get($theme-color, 'active'), 10);
    }

    &__input {
      width: 100%;
      height: 100%;
      border: none;
      margin: 0;
      padding: 0 rem(15px) 0 rem(52px);
      background: none;
      color: map-get($theme-color, 'white');
      font-size: rem(18px);

      @include mobile {
        font-size: rem(14px);
      }
    }

    &__submit {
      font-size: inherit;
      margin: 0;
      padding: 0;
      background: none;
      border: none;
      position: absolute;
      left: rem(15px);
      top: 0;
      bottom: 0;
      cursor: pointer;

      svg {
        width: rem(22px);
        height: rem(22px);
        fill: map-get($theme-color, 'white');

        @include mobile {
          width: rem(18px);
          height: rem(18px);
        }
      }
    }
  }
}
.catalog {
  @include container;

  &-aside {
    @include mobile {
      display: none;
    }
  }

  padding-top: rem(20px);
  padding-bottom: rem(50px);
  display: flex;
  justify-content: space-between;

  &-content {
    flex: 1;
    margin-left: rem(15px);

    @include mobile {
      margin-left: 0;
    }
  }

  &-items {
    display: grid;
    grid-gap: rem(17px);
    grid-template-columns: repeat(4, rem(221px));

    @include mobile {
      grid-template-columns: rem(232px);
      justify-content: center;
    }
  }

  &-error {
    color: map-get($theme-color, 'white');
    font-size: rem(18px);
  }
}
</style>
