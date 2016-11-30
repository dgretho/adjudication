module.exports = {
    entry: './src/app.js',
    output: {
        path: './bin',
        filename: 'app.bundle.js'
    },
    module : {
      loaders : [
        {
          test : /\.jsx?/,
          include : './src/',
          loader : 'babel'
        }
      ]
    }
};