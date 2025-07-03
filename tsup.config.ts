import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/cardboard.ts'],
    clean: false,
    sourcemap: true,
    dts: true,
    format: ['esm', 'cjs', 'iife'],
    globalName: 'Cardboard',
    outDir: 'dist',
    splitting: true,
    external: [],
    minify: true,
    minifyIdentifiers: true,
    platform: 'browser',
    treeshake: false,
})