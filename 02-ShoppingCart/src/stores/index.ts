import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStore = defineStore('store', () => {
  const isCartOpen = ref(false);
  const isModalShow = ref(false);
  const isCompleteOrderShow = ref(false);

  function enableCart() {
    isCartOpen.value = true;
  }

  function disableCart() {
    isCartOpen.value = false;
  }

  function enableModal() {
    isModalShow.value = true;
    setTimeout(() => {
      isModalShow.value = false;
    }, 1250);
  }

  function disableModal() {
    isModalShow.value = false;
  }

  function enableCompleteModal() {
    isCompleteOrderShow.value = true;
    setTimeout(() => {
      isCompleteOrderShow.value = false;
    }, 1500);
  }

  function disableCompleteModal() {
    isCompleteOrderShow.value = false;
  }

  return {
    isCartOpen,
    isModalShow,
    isCompleteOrderShow,
    enableCart,
    disableCart,
    enableModal,
    disableModal,
    enableCompleteModal,
    disableCompleteModal,
  };
});
