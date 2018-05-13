import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';
import pkg from './package.json';
import sizes from 'rollup-plugin-sizes';

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
    uglify(),
    filesize(),
    sizes(),
  ],
};