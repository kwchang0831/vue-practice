<script setup lang="ts">
import type { HTML_Element } from '../types/element';
import SvgChild from './SvgChild.vue';
import { ref, onMounted, reactive } from 'vue';

interface Props {
  input: HTML_Element;
  speed: number;
}
const props = defineProps<Props>();
const emit = defineEmits(['done']);

let isGTag = ref(props.input.name === 'g');
let state = reactive({
  childs: props.input.name !== 'g' ? props.input.elements ?? ([] as Array<HTML_Element>) : ([] as Array<HTML_Element>),
  done: props.input.name !== 'g' ? true : false,
});

function* genChilds() {
  if (!props.input.elements) return;
  yield* props.input.elements;
}

onMounted(() => {
  if (isGTag.value) {
    let gChilds = genChilds();

    (function delay() {
      const cur = gChilds.next();
      if (!cur.done) {
        state.childs.push(cur.value);
        setTimeout(delay, props.speed);
      } else {
        state.done = true;
        emit('done');
      }
    })();
  }
});
</script>

<template>
  <component :is="input.name" v-bind="input.attributes">
    <TransitionGroup name="fade">
      <template v-for="(e, i) in state.childs" :key="e.type + e.name + i">
        <SvgChild :input="e" @done="emit('done')" :speed="speed" />
      </template>
    </TransitionGroup>
  </component>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
