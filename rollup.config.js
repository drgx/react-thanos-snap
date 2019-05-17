import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'src/components/InfinityGauntlet.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
  },
  external: ['react', 'react-proptypes', 'react-dom'],
  plugins: [
    resolve(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env', '@babel/react'],
    }),
    commonjs(),
    uglify(),
  ],
};
