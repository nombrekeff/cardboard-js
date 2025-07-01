import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/cardboard.ts'],
    clean: true,
    sourcemap: true,
    dts: true,
    format: ['esm', 'cjs', 'iife'],
    globalName: 'Cardboard',
    outDir: 'dist',
    splitting: true,
    external: [],
    minify: true,
})