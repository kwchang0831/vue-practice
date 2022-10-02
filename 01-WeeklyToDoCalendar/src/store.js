import { reactive } from 'vue';
import { seedData } from './seed.js';
import { settingData } from './setting.js';

export const store = {
  state: {
    data: reactive(seedData),
    setting: reactive(settingData),
  },
  updateWeek(week) {
    this.state.setting.week = week;
  },
  updateMonth(month) {
    this.state.setting.month = month;
  },
  getActiveDay() {
    return this.state.data.find((day) => day.active);
  },
  setActiveDay(dayId) {
    this.state.data.map((dayObj) => {
      dayObj.id === dayId ? (dayObj.active = true) : (dayObj.active = false);
    });
  },
  findActiveDay(dayId) {
    return this.state.data.find((day) => day.id === dayId);
  },
  doneSetActiveDay() {
    this.state.data.map((dayObj) => {
      dayObj.active = false;
    });
  },
  submitTodo(todoDetails) {
    const activeDay = this.getActiveDay();
    activeDay.todos.push({ details: todoDetails, edit: false });
  },
  deleteTodo(dayId, todoDetails) {
    const dayObj = this.state.data.find((day) => day.id === dayId);
    const todoIndexToRemove = dayObj.todos.findIndex((todo) => todo.details === todoDetails);
    dayObj.todos.splice(todoIndexToRemove, 1);
  },
  editTodo(dayId, todoDetails) {
    console.log(dayId, todoDetails);
    this.resetEditOfAllTodos();
    const todoObj = this.getTodoObj(dayId, todoDetails);
    todoObj.edit = true;
  },
  updateTodo(dayId, todoDetailsOriginal, todoDetailsUpdated) {
    const todoObj = this.getTodoObj(dayId, todoDetailsOriginal);
    todoObj.details = todoDetailsUpdated;
    todoObj.edit = false;
  },
  getTodoObj(dayId, todoDetails) {
    const dayObj = this.findActiveDay(dayId);
    return dayObj.todos.find((todo) => todo.details === todoDetails);
  },
  resetEditOfAllTodos() {
    this.state.data.map((dayObj) => {
      dayObj.todos.map((todo) => {
        todo.edit = false;
      });
    });
  },
};
