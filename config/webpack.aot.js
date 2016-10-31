/**
 * @license Created by felix on 16-10-28.
 * @email   307253927@qq.com
 */
'use strict';

const helpers = require('./helpers');
const ngTools = require('@ngtools/webpack');

/**
 * Webpack Plugins
 */
const AssetsPlugin                  = require('assets-webpack-plugin');
const DefinePlugin                  = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin            = require('webpack/lib/NamedModulesPlugin');
const LoaderOptionsPlugin           = require('webpack/lib/LoaderOptionsPlugin');
const UglifyJsPlugin                = require('webpack/lib/optimize/UglifyJsPlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const WebpackMd5Hash                = require('webpack-md5-hash');
const HtmlWebpackPlugin             = require('html-webpack-plugin');
const CopyWebpackPlugin             = require('copy-webpack-plugin');
const HtmlElementsPlugin            = require('./html-elements-plugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'production';
const METADATA = {
  title  : 'Angular2 Webpack AOT',
  baseUrl: '/',
  ENV    : ENV,
  AOT    : true
};

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function (options) {
  return {
    devtool: 'source-map',
    entry  : {
      'main': './src/main.browser.aot.ts'
    },
    output : {
      
      path: helpers.root('aot/dist'),
      
      filename: '[name].[chunkhash].bundle.js',
      
      sourceMapFilename: '[name].[chunkhash].bundle.map',
    },
    
    resolve: {
      
      extensions: ['.ts', '.js', '.json'],
      
      // An array of directory names to be resolved to the current directory
      modules: [helpers.root('src'), 'node_modules'],
      
    },
    
    module: {
      rules: [
        {
          test   : /\.ts$/,
          loader : '@ngtools/webpack',
          exclude: [/\.(spec|e2e)\.ts$/]
        }, {
          test  : /\.json$/,
          loader: 'json-loader'
        }, {
          test   : /\.css$/,
          loaders: ['to-string-loader', 'css-loader']
        }, {
          test   : /\.html$/,
          loader : 'raw-loader',
          exclude: [helpers.root('src/index.html')]
        }, {
          test  : /\.(jpg|png|gif)$/,
          loader: 'file'
        }
      ]
    },
    
    plugins: [
      new AssetsPlugin({
        path       : helpers.root('aot/dist'),
        filename   : 'webpack-assets.json',
        prettyPrint: true
      }),
      
      new WebpackMd5Hash(),
      
      new ngTools.AotPlugin({
        tsConfigPath: './tsconfig-aot.json',
        entryModule : './src/app/app.module#AppModule'
      }),
      
      new HtmlElementsPlugin({
        headTags: require('./head-config.common')
      }),
      
      new HtmlWebpackPlugin({
        template      : 'src/index.html',
        title         : METADATA.title,
        chunksSortMode: 'dependency',
        metadata      : METADATA,
        inject        : 'body'
      }),
      
      new CopyWebpackPlugin([{
        from: 'src/assets',
        to  : 'assets'
      }, {
        from: 'src/meta'
      }, {
        from: 'node_modules/core-js/client/shim.min.js'
      }, {
        from: 'node_modules/zone.js/dist/zone.min.js'
      }]),
      
      // NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
      new DefinePlugin({
        'ENV'        : JSON.stringify(METADATA.ENV),
        'HMR'        : METADATA.HMR,
        'process.env': {
          'ENV'     : JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV),
          'HMR'     : METADATA.HMR,
        }
      }),
      
      // NOTE: using UglifyJsPlugin will lose source map
      new UglifyJsPlugin({
        // beautify: true, //debug
        // mangle: false, //debug
        // dead_code: false, //debug
        // unused: false, //debug
        // deadCode: false, //debug
        // compress: {
        //   screw_ie8: true,
        //   keep_fnames: true,
        //   drop_debugger: false,
        //   dead_code: false,
        //   unused: false
        // }, // debug
        // comments: true, //debug
        
        
        beautify: false, //prod
        mangle  : {
          screw_ie8  : true,
          keep_fnames: true
        }, //prod
        compress: {
          screw_ie8: true
        }, //prod
        comments: false //prod
      }),
      
      /**
       * Plugin LoaderOptionsPlugin (experimental)
       *
       * See: https://gist.github.com/sokra/27b24881210b56bbaff7
       */
      new LoaderOptionsPlugin({
        debug  : false,
        options: {
          
          /**
           * Static analysis linter for TypeScript advanced options configuration
           * Description: An extensible linter for the TypeScript language.
           *
           * See: https://github.com/wbuchwalter/tslint-loader
           */
          tslint: {
            emitErrors  : true,
            failOnHint  : true,
            resourcePath: 'src'
          },
          
        }
      }),
    
    ],
    
    /*
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
      global        : true,
      crypto        : 'empty',
      process       : false,
      module        : false,
      clearImmediate: false,
      setImmediate  : false
    }
    
  };
};
