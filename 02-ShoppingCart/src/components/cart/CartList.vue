<script setup>
import CartListItem from './CartListItem.vue';
import { useStore } from '../../stores';
import { useCartStore } from '../../stores/cart';
const store = useStore();
const cartStore = useCartStore();

function handleCheckout() {
  cartStore.checkout();
}
</script>

<template>
  <div class="grid grid-cols-6 items-center w-full px8">
    <h1
      class="col-span-4 col-start-2 font-700 text-2xl m8 p4 border-1 border-black rounded text-center min-w-128 place-self-center">
      Cart List
    </h1>
    <button
      class="ml-auto py-4 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
      aria-label="Cart"
      @click="store.disableCart">
      <div class="i-fa-close w8 h8 mx4 hover:cursor-pointer"></div>
    </button>
  </div>
  <div class="flex flex-col gap4 items-center w-full px8">
    <div class="border-1 rounded border-black overflow-hidden w-full hidden md:block">
      <div class="grid grid-cols-8 gap4 min-h-12 place-content-center">
        <div class="col-span-4 text-center">Product</div>
        <div class="col-span-1 text-center">Price</div>
        <div class="col-span-1 text-center">Quantity</div>
        <div class="col-span-1 text-center">Total</div>
        <div class="col-span-1 text-center">Action</div>
      </div>
    </div>
    <CartListItem
      v-for="(item, index) in cartStore.getCartItems"
      :key="index"
      :product="item.product"
      :quantity="item.quantity.toString()"
      :totalPrice="item.totalPrice" />
    <div
      class="border-1 rounded border-black overflow-hidden w-full flex flex-col px4 py6 justify-end items-center gap6 md:(flex-row)">
      <p class="font900 text-lg">
        Total Price:
        <span class="price">{{ cartStore.getTotalPrice }}</span>
      </p>
      <button
        @click="handleCheckout"
        class="rounded bg-[#007500] text-white px3 py2 font-700 text-lg hover:scale-110 transition transform duration-300 ease-in-out flex items-center gap2">
        <div class="i-fa-shopping-cart"></div>
        Checkout
      </button>
      <button
        class="rounded bg-red text-white px3 py2 hover:scale-110 transition transform duration-300 ease-in-out flex items-center gap2"
        @click="cartStore.mutateRemoveAll()">
        <div class="i-fa-trash"></div>
        Remove all
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
picture {
  --at-apply: 'overflow-hidden';
}
.price {
  &::before {
    content: '$';
  }
}
</style>
