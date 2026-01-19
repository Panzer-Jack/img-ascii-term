import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    'src/index.ts',
  ],
  dts: true,
  shims: true,
  format: ['esm'],
  exports: true,
  external: ['canvas', 'chalk'],
})
