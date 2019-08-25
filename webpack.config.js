const path = require("path");
const webpack = require("webpack");
const os = require("os");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

function resolve(dir) {
    return path.join(__dirname, dir);
}

const workerPool = {
    workers: os.cpus().length,
    poolTimeout: 2000
};

module.exports = {
    context: path.resolve(__dirname),
    entry: {
        app: resolve("src/entry.tsx")
    },
    output: {
        filename: isProd ? 'script/[name].[contenthash:4].js' : 'script/[name].js',
        chunkFilename: isProd ? 'script/[name].[contenthash:4].chunk.js' : 'script/[name].chunk.js',
        path: resolve("www"),
        publicPath: '/' //1.解决react-router多级路由导致资源404或跨越问题
    },
    mode: isProd ? "production" : "development",
    devtool: isProd ? false : "cheap-module-eval-source-map",
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.scss', '.json'],
        modules: [
            resolve('src'),
            resolve('node_modules')
        ],
        alias: {
            "react-dom": isProd ? resolve("node_modules/react-dom") : "@hot-loader/react-dom",
            "@containers": resolve("src/containers"),
            "@components": resolve("src/components"),
            "@utils": resolve("src/utils"),
            "@images": resolve("src/images"),
            "@routers": resolve("src/routers"),
            "@src": resolve("src")
        }
    },
    target: 'web', // electron-main，web，electron-renderer
    optimization: {
        minimize: isProd,
        minimizer: [
            new ParallelUglifyPlugin({
                cacheDir: '.cache/',
                uglifyJS: {
                    output: {
                        comments: false
                    },
                    warnings: false
                }
            }), new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require("cssnano"),
                cssProcessorPluginOptions: {
                    preset: ['default', {
                        discardComments: {
                            removeAll: true
                        },
                        normalizeUnicode: false
                    }]
                },
                canPrint: true
            })
        ],
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
                commons: {
                    chunks: "initial",
                    name: "common",
                    minChunks: 2,
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0, // This is example is too small to create commons chunks
                    reuseExistingChunk: true
                }
            },
        }
    },
    module: {
        // 忽略对jquery lodash的进行递归解析
        // noParse: function (content) {
        //     return /jquery|lodash/i.test(content)
        // },
        rules: [{
            test: /\.(ts|tsx|js|jsx)$/,
            exclude: /node_modules/,
            include: [resolve("src")],
            use: [{
                loader: 'thread-loader',
                options: workerPool
            }, 'babel-loader?cacheDirectory=true']
        }, {
            test: /\.(sa|sc|c)ss$/,
            exclude: /node_modules/,
            include: [resolve("src")],
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: !isProd,
                        reloadAll: true
                    }
                },
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        modules: {
                            mode: 'local',
                            context: resolve("src"),
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    }
                },
                'sass-loader',
                {
                    loader: 'sass-resources-loader',
                    options: {
                        resources: [resolve("src/theme.scss")]
                    }
                }
            ]
        }, {
            test: /\.(png|jpg|jpeg|gif|svg)$/i,
            use: [{
                loader: "url-loader",
                options: {
                    limit: 8192,
                    name: isProd ? "[name].[contenthash:4].[ext]" : "[name].[ext]",
                    outputPath: "images"
                }
            }, {
                loader: 'image-webpack-loader',
                options: {
                    bypassOnDebug: true,
                    disable: isProd
                }
            }]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dll/manifest.json')
        }),
        new MiniCssExtractPlugin({
            filename: isProd ? 'css/[name].[contenthash:4].css' : 'css/[name].css',
            chunkFilename: isProd ? 'css/[id].[contenthash:4].css' : 'css/[id].css'
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: resolve("src/index.html"),
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd,
                minifyCSS: isProd
            },
            chunks: ['app', 'common'],
            inject: true
        }),
        new AddAssetHtmlPlugin({
            filepath: resolve('dll/*.dll.js'),
            outputPath: "script",
            publicPath: "/script", //3.解决react-router多级路由导致资源404或跨越问题
            hash: isProd
        })
    ],
    devServer: {
        port: 3000,
        compress: true,
        historyApiFallback: true //2.解决react-router多级路由导致资源404或跨越问题
    }
};