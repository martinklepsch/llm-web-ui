import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['server.js', 'src/server.js', 'src/db/schma.ts'],
    treeshake: true,
    format: 'esm',
    dts: true,
    clean: true,
});