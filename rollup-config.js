/**
 * @license Created by felix on 16-10-28.
 * @email   307253927@qq.com
 */
'use strict';
import rollup      from 'rollup'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs    from 'rollup-plugin-commonjs';
import uglify      from 'rollup-plugin-uglify'

//paths are relative to the execution path
export default {
  entry: 'src/main.browser.aot.js',
  dest: 'aot/dist/main.build.js', // output a single application bundle
  sourceMap: true,
  sourceMapFile: 'aot/dist/main.build.js.map',
  format: 'iife',
  plugins: [
    nodeResolve({jsnext: true, module: true}),
    commonjs({
      include: [
        'node_modules/rxjs/**'
      ],
    }),
    uglify()
  ]
}
