import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'

export default {
  input: {
    analysis: './src/index.ts',
    rm: './src/rm.ts',
  },
  output: [
    {
      dir: './bin',
      format: 'esm',
      chunkFileNames: 'chunks/[name].js',
      entryFileNames: '[name].mjs',
    },
  ],
  plugins: [resolve(), commonjs(), typescript()],
}
