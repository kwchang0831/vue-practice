<script setup>
import ProductList from './components/product/ProductList.vue';
import CartList from './components/cart/CartList.vue';
import { useStore } from './stores';
const store = useStore();
</script>

<template>
  <div id="app">
    <Transition name="fade" @click="store.disableCompleteModal()">
      <div v-if="store.isCompleteOrderShow" class="modal-overlay">
        <div class="modal">
          <div class="i-fa-check-circle-o text-green w12 h12"></div>
          <h2>Thanks for Ordering</h2>
        </div>
      </div>
    </Transition>
    <Transition name="fade" @click="store.disableModal()">
      <div v-if="store.isModalShow" class="modal-overlay">
        <div class="modal">
          <div class="i-fa-check-circle-o text-green w12 h12"></div>
          <h2>Added to the Cart.</h2>
        </div>
      </div>
    </Transition>
    <ProductList v-if="!store.isCartOpen" />
    <CartList v-if="store.isCartOpen" />
  </div>
</template>

<style lang="scss" scoped>
#app {
  --at-apply: 'pb8 relative';
}

.modal {
  --at-apply: 'bg-black/[0.8] rounded-2xl shadow-xl text-white w-80 h-48 text-center flex flex-col justify-center items-center gap4  transition transform duration-300 ease-in-out';

  h2 {
    --at-apply: 'font-700 text-2xl';
  }
}

.modal-overlay {
  --at-apply: 'z-999 flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 transition transform duration-300 ease-in-out';
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
