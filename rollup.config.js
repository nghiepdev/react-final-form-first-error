const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');

module.exports = {
  input: 'index.js',
  output: {
    file: 'bundle.js',
    format: 'umd',
    name: 'react-final-form-first-error',
    exports: 'named',
    globals: {
      react: 'React',
      'react-final-form': 'react-final-form',
    },
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
  external: ['react', 'react-final-form'],
};
