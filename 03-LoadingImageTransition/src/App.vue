<script setup>
import SvgRoot from './components/SvgRoot.vue';
import inputData from './assets/input.json';
</script>

<template>
  <div class="h-100vh grid justify-center content-center">
    <SvgRoot :input="inputData" :src="`/input.jpg`" :speed="16"></SvgRoot>
  </div>
</template>
