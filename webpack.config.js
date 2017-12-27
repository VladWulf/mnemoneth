const webpack = require('webpack');

module.exports = {
    entry: {
        main: "./assets.js",
    },
    output: {
        path: __dirname + "/build/",
        filename: "mnemoneth.js"
    },
    // plugins: [
    //   new webpack.optimize.UglifyJsPlugin({minimize: true})
    // ]
};
