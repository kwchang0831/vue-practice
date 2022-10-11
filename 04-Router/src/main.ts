import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { markRaw } from 'vue';

import '@unocss/reset/tailwind.css';
import 'uno.css';
import './style.scss';
import App from './App.vue';
import router from './router';
const app = createApp(App);

const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});
app.use(pinia);
app.use(router);
app.mount('body');
