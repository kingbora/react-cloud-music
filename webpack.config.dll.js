const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const isProd = process.env.NODE_ENV === "production";

const vendors = [
    'react',
    isProd ? 'react-dom' : "@hot-loader/react-dom",
    'react-router-dom',
    'classnames',
    'axios'
];
const libs = [
    'redux',
    'react-redux',
    'redux-thunk',
    'redux-actions'
];

module.exports = {
    entry: {
        vendor: vendors,
        lib: libs
    },
    context: __dirname,
    devtool: false,
    mode: isProd ? 'production' : 'development',
    output: {
        path: path.resolve(__dirname, "dll"),
        filename: '[name].dll.js',
        library: '_dll_[name]'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            path: path.resolve(__dirname, 'dll', 'manifest.json'),
            name: '_dll_[name]',
            context: "."
        })
    ]
};