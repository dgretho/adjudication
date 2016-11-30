var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'bin');
var APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
    entry: APP_DIR + '/app.js',
    output: {
        path: './bin',
        filename: 'app.bundle.js'
    },
    module : {
      loaders : [
        {
          test : /\.jsx?/,
          include : APP_DIR,
          loader : 'babel'
        }
      ]
    }
};