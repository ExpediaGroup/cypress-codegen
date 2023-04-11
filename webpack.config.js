const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{ test: /\.ts|\.tsx$/, use: 'ts-loader' }]
  }
};
