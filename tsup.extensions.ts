import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/ext/components.ts', 'src/ext/routing.ts', 'src/ext/tween.ts'],
    clean: false,
    // sourcemap: true,
    dts: true,
    format: ['esm'],
    outDir: 'dist/ext/',
    splitting: true,
    // external: ['../cardboard.js', './src/*', 'src/observables.ts'],
    // Use a regex to match all imports from your core library
    external: [
        /^(\.\.\/)?cardboard(\.js)?$/, // matches '../cardboard.js' and 'cardboard.js'
        /^(\.\.\/)?cardboard(\.js)?\/.*/, // matches submodules like '../cardboard/foo.js'
        /^src\/cardboard(\.ts|\.js)?$/, // matches 'src/cardboard.ts' or 'src/cardboard.js'
        /^src\/cardboard\/.*/, // matches 'src/cardboard/anything'
    ],
    minify: true,
    platform: 'browser',
    treeshake: true,
})