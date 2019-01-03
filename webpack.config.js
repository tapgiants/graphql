var path = require('path');

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
      'recompose': path.resolve(__dirname, './node_modules/recompose')
    }
  },
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
    }
  }
};
