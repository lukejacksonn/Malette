// Rollup plugins
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import postcss from 'rollup-plugin-postcss';

// PostCSS plugins
import nested from 'postcss-nested';

export default {
  entry: 'src/main.js',
  dest: 'out/main.js',
  format: 'iife',
  sourceMap: process.env.NODE_ENV === 'production' ? false : 'inline',
  useStrict: false,
  plugins: [
    postcss({
      plugins: [nested()],
      extensions: ['.scss'],
    }),
    resolve({
      module: true,
      jsnext: true,
      main: true,
      browser: true,
      extensions: ['.js']
    }),
    commonjs(),
    eslint({ exclude: ['src/**/*.scss'] }),
    babel({ exclude: ['node_modules/**', 'src/**/*.scss'] }),
    (process.env.NODE_ENV === 'production' && uglify()),
  ],
};
