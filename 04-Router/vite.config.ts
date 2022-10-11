import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Unocss from 'unocss/vite';
import { presetIcons, presetUno } from 'unocss';
import transformerDirective from '@unocss/transformer-directives';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import { presetScrollbar } from 'unocss-preset-scrollbar';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Unocss({
      presets: [presetUno(), presetIcons(), presetScrollbar()],
      transformers: [transformerDirective(), transformerVariantGroup()],
    }),
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
