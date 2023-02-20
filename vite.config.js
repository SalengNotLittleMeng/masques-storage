// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    server: {
      hmr: true,
    },
    sourcemap: true,
    watch: {},
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/main.js'),
      name: 'masquesStorage',
      // the proper extensions will be added
      fileName: 'masquesStorage',
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        dir: 'lib',
        name: 'MasquesStorage',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
