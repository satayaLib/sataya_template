import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';

import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import legacy from '@vitejs/plugin-legacy';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { browserslist } from './package.json';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  /* eslint-disable-line */const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      CAMPAIGN_ID: JSON.stringify(env.CAMPAIGN_ID),
      API_URL: JSON.stringify(env.API_URL),
    },
    plugins: [
      vue(),
      legacy({
        targets: browserslist,
      }),
      ViteImageOptimizer({})
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
        '@ui': fileURLToPath(new URL('./src/components/ui', import.meta.url)),
        '@icons': fileURLToPath(new URL('./src/components/icons', import.meta.url)),
      }
    },
    css:{
      postcss: {
        plugins: [
          autoprefixer(),
        ]
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@use 'sass:math';@import './src/scss/init';`
        }
      }
    }
  }
})
