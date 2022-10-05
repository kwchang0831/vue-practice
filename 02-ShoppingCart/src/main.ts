import { createApp } from 'vue';
import { createPinia } from 'pinia';
import '@unocss/reset/tailwind.css';
import 'uno.css';
import './style.scss';
import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount('body');
