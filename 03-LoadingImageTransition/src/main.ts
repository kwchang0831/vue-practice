import { createApp } from 'vue';
import '@unocss/reset/tailwind.css';
import 'uno.css';
import './style.scss';
import App from './App.vue';

const app = createApp(App);

app.mount('body');
