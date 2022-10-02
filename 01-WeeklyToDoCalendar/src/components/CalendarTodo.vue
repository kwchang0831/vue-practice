<template>
  <li>
    <div v-if="!todo.edit" class="my1 flex items-center">
      <input type="checkbox" />
      <span class="mx1 flex-1 whitespace-nowrap scrollbar scrollbar-h-6px scrollbar-thumb-color-green">
        {{ todo.details }}
      </span>
      <div @click="editTodo(day.id, todo.details)" class="m1 i-fa-pencil !w3 !h3 p1 hover:cursor-pointer"></div>
      <div @click="deleteTodo(day.id, todo.details)" class="m1 i-fa-trash !w3 !h3 p1 hover:cursor-pointer"></div>
    </div>
    <div v-if="todo.edit" class="my1 flex items-center">
      <input
        type="text"
        :placeholder="todo.details"
        v-model="newTodoDetails"
        class="mx1 flex-1 whitespace-nowrap scrollbar scrollbar-h-6px scrollbar-thumb-color-green" />
      <div
        @click="updateTodo(day.id, todo.details, newTodoDetails)"
        class="m1 i-fa-check !w3 !h3 p1 hover:cursor-pointer"></div>
    </div>
  </li>
</template>

<script>
import { store } from '../store.js';

export default {
  name: 'CalendarTodo',
  props: ['todo', 'day'],
  data() {
    return {
      newTodoDetails: '',
    };
  },
  methods: {
    deleteTodo(dayId, todoDetails) {
      store.deleteTodo(dayId, todoDetails);
    },
    editTodo(dayId, todoDetails) {
      store.editTodo(dayId, todoDetails);
    },
    updateTodo(dayId, todoDetailsOriginal, todoDetailsUpdated) {
      if (todoDetailsUpdated === '') todoDetailsUpdated = todoDetailsOriginal;
      store.updateTodo(dayId, todoDetailsOriginal, todoDetailsUpdated);
      this.newTodoDetails = '';
    },
  },
};
</script>
