# angular2-webpack-aot
> This project is modified on the basis of AngularClass

> angular version 2.1.2


## quick start
###Make sure you have Node version >= 5.0 and NPM >= 3
```bash
# clone
https://github.com/felix307253927/angular2-webpack-aot.git

cd angular2-webpack-starter

# install the repo with npm
npm install

# start the server 
npm start

# Compile project via aot
npm run build:aot


# You can also use @angular/compiler-cli to compile
# npm install rollup rollup-plugin-node-resolve rollup-plugin-commonjs rollup-plugin-uglify --save-dev
npm run ngc
npm run rollup
-------------------------------------------------------------------------------------------------------------
Rollup may log many lines with the following warning message:
   The `this` keyword is equivalent to `undefined` at the top level of an ES module, and has been rewritten
You can safely ignore these warnings.
-------------------------------------------------------------------------------------------------------------
```

go to [http://0.0.0.0:3000](http://0.0.0.0:3000) or [http://localhost:3000](http://localhost:3000) in your browser

## File Structure
```
angular2-webpack-aot/
 ├──config/                    * our configuration
 |   ├──helpers.js             * helper functions for our configuration files
 |   ├──spec-bundle.js         * ignore this magic that sets up our angular 2 testing environment
 |   ├──karma.conf.js          * karma config for our unit tests
 |   ├──protractor.conf.js     * protractor config for our end-to-end tests
 │   ├──webpack.dev.js         * our development webpack config
 │   ├──webpack.aot.js         * our aot webpack config
 │   ├──webpack.prod.js        * our production webpack config
 │   └──webpack.test.js        * our testing webpack config
 │
 ├──src/                       * our source files that will be compiled to javascript
 |   ├──main.browser.ts        * our entry file for our browser environment
 |   ├──main.browser.aot.ts    * our entry file for AOT environment
 │   │
 |   ├──index.html             * Index.html: where we generate our index page
 │   │
 |   ├──polyfills.ts           * our polyfills file
 │   │
 |   ├──vendor.browser.ts      * our vendor file
 │   │
 │   ├──app/                   * WebApp: folder
 │   │   ├──app.spec.ts        * a simple test of components in app.ts
 │   │   ├──app.e2e.ts         * a simple end-to-end test for /
 │   │   └──app.ts             * App.ts: a simple version of our App component components
 │   │
 │   └──assets/                * static assets are served here
 │       ├──icon/              * our list of icons from www.favicon-generator.org
 │       ├──service-worker.js  * ignore this. Web App service worker that's not complete yet
 │       ├──robots.txt         * for search engines to crawl your website
 │       └──humans.txt          * for humans to know who the developers are
 │
 │
 ├──tslint.json                * typescript lint config
 ├──typedoc.json               * typescript documentation generator
 ├──tsconfig.json              * config that webpack uses for typescript
 ├──tsconfig-aot.json          * config that webpack.aot uses for typescript
 ├──rollup-config.js           * rollup main configuration file
 ├──package.json               * what npm uses to manage it's dependencies
 └──webpack.config.js          * webpack main configuration file

```
