import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: 'REACT_APP_',
  server: {
    port: 3000,
  },
  define: {
    'process.env': process.env,
  },
  resolve: {
    alias: {
      src: '/src',
      app: '/src/app',
      assets: '/src/assets',
      components: '/src/components',
      hooks: '/src/hooks',
      constants: '/src/constants',
      locales: '/src/locales',
      styles: '/src/styles',
      types: '/src/types',
      utils: '/src/utils',
    },
  },
  build: {
    outDir: 'build',
  },
  plugins: [
    reactRefresh(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
});
