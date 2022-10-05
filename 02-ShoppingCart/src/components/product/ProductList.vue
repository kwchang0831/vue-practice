<script setup>
import ProductListItem from './ProductListItem.vue';
import { useCartStore } from '../../stores/cart';
import { useProductStore } from '../../stores/product';
import { useStore } from '../../stores';
const store = useStore();
const productStore = useProductStore();
const cartStore = useCartStore();
</script>

<template>
  <div class="grid grid-cols-6 items-center w-full px8">
    <h1
      class="col-span-4 col-start-2 font-700 text-2xl m8 p4 border-1 border-black rounded text-center min-w-128 place-self-center">
      Product List
    </h1>
    <button
      class="ml-auto py-4 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
      aria-label="Cart"
      @click="store.enableCart()">
      <div class="i-fa-shopping-cart w8 h8 mx4 hover:cursor-pointer"></div>
      <span
        class="absolute inset-0 object-right-top -mr-6 transform transition duration-300 ease-in-out"
        v-if="cartStore.getTotalItems > 0">
        <div
          class="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
          {{ cartStore.getTotalItems }}
        </div>
      </span>
    </button>
  </div>
  <div class="flex flex-row justify-center">
    <div
      class="flex flex-col md:(grid grid-cols-[repeat(3,auto)] mx8 p8 w-fit border-1 rounded border-black) gap8 place-content-center w-full">
      <ProductListItem v-for="p in productStore.products" :key="p.id" :product="p" />
    </div>
  </div>
</template>
