<template>
  <div id="app">
    <div class="flex justify-center items-center">
      <CalendarRoot />
    </div>
  </div>
</template>

<script>
import CalendarRoot from './components/CalendarRoot.vue';

export default {
  name: 'App',
  components: {
    CalendarRoot,
  },
};
</script>

<style lang="scss">
html,
body,
#app {
  --at-apply: 'h-full';
}
</style>
