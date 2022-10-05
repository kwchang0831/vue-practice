<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useCartStore } from '../../stores/cart';
import type { Product } from '../../types/product';
interface Props {
  product: Product;
  quantity: string;
  totalPrice: number;
}
defineProps<Props>();
const cartStore = useCartStore();

const refInputQuantity = ref(null);

const handleKeyUp = (id: number, quantity: number) => {
  cartStore.setQuantity(id, quantity);
  nextTick(() => {
    if (refInputQuantity.value) (refInputQuantity.value as HTMLElement).blur();
  });
};
let inputQuantity: string;
</script>
<template>
  <div class="border-1 rounded border-black overflow-hidden md:(grid grid-cols-8) flex flex-col gap4">
    <div class="col-span-4 flex flex-col items-center gap4 md:(flex-row)">
      <picture>
        <img :src="product.cover" :alt="product.cover" class="w-auto md:(max-h-48) object-cover" />
      </picture>
      <h2 class="flex-1">{{ product.title }}</h2>
    </div>
    <div class="m-auto">
      <span class="px2 md:hidden">Price:</span>
      <span class="price">{{ product.price }}</span>
    </div>
    <div class="flex items-center px4">
      <div class="border-1 border-black/[0.5] p2">
        <div
          class="i-fa-minus w4 h4 text-black/[0.75] hover:cursor-pointer"
          @click="cartStore.mutateQuantity(product.id, -1)"></div>
      </div>
      <input
        type="number"
        ref="refInputQuantity"
        :placeholder="quantity"
        v-model="inputQuantity"
        @change="cartStore.setQuantity(product.id, parseInt(inputQuantity))"
        @keyup.enter="handleKeyUp(product.id, parseInt(inputQuantity))"
        class="text-center w-full border-t-1 border-b-1 border-black/[0.5] py1" />
      <div class="border-1 border-black/[0.5] p2">
        <div
          class="i-fa-plus w4 h4 text-black/[0.75] hover:cursor-pointer"
          @click="cartStore.mutateQuantity(product.id, 1)"></div>
      </div>
    </div>
    <div class="m-auto">
      <span class="px2 md:hidden">Total:</span>
      <span class="price">{{ totalPrice }}</span>
    </div>
    <div class="flex items-center m-auto my4">
      <div class="i-fa-trash hover:cursor-pointer" @click="cartStore.mutateRemoveItemByID(product.id)"></div>
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
