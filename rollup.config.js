import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import filesize from 'rollup-plugin-filesize';
import builtins from 'rollup-plugin-node-builtins';
import global from 'rollup-plugin-node-globals';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      name: 'coinslot',
      file: pkg.main,
      format: 'umd',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: true,
    }),
    commonjs(),
    babel({
      babelrc: false,
      presets: [
        [
          'env',
          {
            modules: false,
            targets: ['last 5 versions'],
          },
        ],
      ],
      exclude: 'node_modules/**',
      plugins: [
        'external-helpers',
      ],
    }),
    minify({
      comments: false,
    }),
    filesize(),
    builtins(),
    global(),
  ],
};