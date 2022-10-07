<script setup lang="ts">
import SvgChild from './SvgChild.vue';
import type { HTML_Element } from '../types/element';
import { ref } from 'vue';

interface Props {
  input: {
    elements: HTML_Element[];
  };
  src: string;
  speed: number;
}
const props = defineProps<Props>();

let done = ref(props.input.elements[0].name !== 'svg');

function doneHandle() {
  done.value = true;
}
</script>

<template>
  <div class="relative w-[1024px] h-[680px]">
    <Transition name="fade">
      <SvgChild
        v-show="!done"
        :input="input.elements[0]"
        :speed="speed"
        @done="doneHandle"
        class="absolute top-0 left-0" />
    </Transition>
    <Transition name="fade">
      <img v-show="done" :src="src" :alt="src" class="absolute top-0 left-0 object-cover" decoding="async" />
    </Transition>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s cubic-bezier(0.46, 0.89, 0.67, 0.21);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
