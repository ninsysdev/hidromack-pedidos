const { InjectManifest } = require('workbox-webpack-plugin');
const { defineConfig } = require('@vue/cli-service')
module.exports =  defineConfig({
  transpileDependencies: true,
  pwa: {
    plugins: {
      add: [
        [
          new InjectManifest({
            swSrc: './src/service-worker.js',
            swDest: './dist/service-worker.js',
          }),
          'append',
        ],
      ],
    },
  },
});