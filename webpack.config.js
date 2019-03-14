const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  // Use for debug
  // optimization: {
  //   namedModules: true
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|build)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      'react-apollo': path.resolve(__dirname, './node_modules/react-apollo'),
      'apollo-boost': path.resolve(__dirname, './node_modules/apollo-boost'),
      'graphql': path.resolve(__dirname, './node_modules/graphql'),
      'recompose': path.resolve(__dirname, './node_modules/recompose'),
      'apollo-absinthe-upload-link': path.resolve(__dirname, './node_modules/apollo-absinthe-upload-link')
    }
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, 'node-noop')
  ],
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM'
    },
    recompose: {
      commonjs: 'recompose',
      commonjs2: 'recompose',
      amd: 'recompose'
    },
    'react-apollo': {
      commonjs: 'react-apollo',
      commonjs2: 'react-apollo',
      amd: 'react-apollo'
    },
    'apollo-boost': {
      commonjs: 'apollo-boost',
      commonjs2: 'apollo-boost',
      amd: 'apollo-boost'
    },
    'graphql': {
      commonjs: 'graphql',
      commonjs2: 'graphql',
      amd: 'graphql'
    },
    'apollo-link-http': {
      commonjs: 'apollo-link-http',
      commonjs2: 'apollo-link-http',
      amd: 'apollo-link-http'
    },
    'apollo-client': {
      commonjs: 'apollo-client',
      commonjs2: 'apollo-client',
      amd: 'apollo-client'
    },
    'apollo-cache-inmemory': {
      commonjs: 'apollo-cache-inmemory',
      commonjs2: 'apollo-cache-inmemory',
      amd: 'apollo-cache-inmemory'
    },
    'apollo-absinthe-upload-link': {
      commonjs: 'apollo-absinthe-upload-link',
      commonjs2: 'apollo-absinthe-upload-link',
      amd: 'apollo-absinthe-upload-link',
      root: 'apollo-absinthe-upload-link'
    },
  }
};
