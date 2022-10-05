<script setup lang="ts">
import type { Product } from '../../types/product';
import { useStore } from '../../stores';
import { useCartStore } from '../../stores/cart';
const store = useStore();
const cartStore = useCartStore();

interface Props {
  product: Product;
}
defineProps<Props>();

function handleClick(id: number) {
  cartStore.mutateQuantity(id, 1);
  store.enableModal();
}
</script>

<template>
  <div class="product-tile">
    <picture>
      <img :src="product.cover" alt="" />
    </picture>
    <h2 class="title">{{ product.title }}</h2>
    <p class="description">{{ product.description }}</p>
    <div class="action">
      <div class="price">{{ product.price }}</div>
      <button class="btn-add-to-cart" @click="handleClick(product.id)">Add to Cart</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-tile {
  --at-apply: 'w-full lg:max-w-90 h130 flex flex-col border-1 border-black rounded shadow-xl overflow-hidden';

  picture {
    --at-apply: 'overflow-hidden';
  }
  img {
    --at-apply: 'object-cover w-full h-auto mb4 hover:scale-125 overflow-hidden transition transform duration-300 ease-in-out';
  }
  .title {
    --at-apply: 'px3 py1 font-700 text-xl leading-normal';
  }
  .description {
    --at-apply: 'px3 py1 text-base';
  }

  .action {
    --at-apply: 'mt-auto flex justify-between items-center p3';

    .btn-add-to-cart {
      --at-apply: 'rounded bg-[#007500] text-white px3 py2  hover:scale-110 transition transform duration-300 ease-in-out';
    }

    .price {
      &:before {
        content: '$ ';
      }
      --at-apply: 'font-700 text-lg';
    }
  }
}
</style>
