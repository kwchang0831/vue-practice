<template>
  <div class="calendar-day">
    <div class="h-full flex flex-col">
      <h2>
        {{ day.fullTitle }}
        <div v-if="!day.active" class="i-fa-plus w3 h3 hover:cursor-pointer" @click="setActiveDay(day.id)"></div>
        <div v-if="day.active" class="i-fa-close w3 h3 hover:cursor-pointer" @click="doneSetActiveDay()"></div>
      </h2>
      <ul v-if="!day.active">
        <CalendarTodo v-for="(todo, index) in day.todos" :key="index" :todo="todo" :day="day" />
      </ul>

      <input
        v-if="day.active"
        class="p1 border-1 border-black/[0.5] rounded"
        ref="inputNewTodo"
        type="text"
        placeholder="New Todo"
        v-model="newTodo"
        required />
      <p v-if="day.active && error" class="text-red font-700 text-xs p1">You must type something first!</p>
      <button v-if="day.active" @click="submitTodo(newTodo)" class="mt-auto bg-black/[0.75] text-white rounded">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import { store } from '../store';
import CalendarTodo from './CalendarTodo.vue';

export default {
  name: 'CalendarDay',
  props: ['day'],
  data() {
    return {
      newTodo: '',
      error: false,
    };
  },
  components: { CalendarTodo },
  methods: {
    setActiveDay(dayId) {
      store.setActiveDay(dayId);
      this.$nextTick(() => {
        this.$refs.inputNewTodo.focus();
      });
    },
    doneSetActiveDay() {
      store.doneSetActiveDay();
    },
    submitTodo(todoDetails) {
      if (todoDetails === '') return (this.error = true);

      store.submitTodo(todoDetails);
      this.newTodo = '';
      this.error = false;
      this.doneSetActiveDay();
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar-day {
  --at-apply: 'w-[14rem] h-[14rem] bg-white px3 py2';

  h2 {
    --at-apply: 'font-700 mb2 py1 px1 border-b-2 border-red flex justify-between items-center';
  }
}
</style>
