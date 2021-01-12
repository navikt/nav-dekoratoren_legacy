const moment = require('moment');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const prefixer = require('postcss-prefix-selector');
const autoprefixer = require('autoprefixer');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const commonConfig = {
    mode: process.env.NODE_ENV || 'development',
    devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
        alias: {
            src: path.resolve(__dirname, './src'),
            api: path.resolve(__dirname, './src/api'),
            ikoner: path.resolve(__dirname, './src/ikoner'),
            komponenter: path.resolve(__dirname, './src/komponenter'),
            providers: path.resolve(__dirname, './src/providers'),
            reducers: path.resolve(__dirname, './src/reducers'),
            store: path.resolve(__dirname, './src/store'),
            tekster: path.resolve(__dirname, './src/tekster'),
            types: path.resolve(__dirname, './src/types'),
            utils: path.resolve(__dirname, './src/utils'),
        },
    },
    stats: 'errors-only',
    module: {
        rules: [
            {
                test: [/\.gif$/, /\.jpe?g$/, /\.png$/, /\.ico$/, /\.svg$/],
                loader: 'file-loader',
                options: {
                    esModule: false,
                    outputPath: '/media',
                    publicPath: '/media/',
                    name: '[name].[ext]',
                },
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svgo-loader',
                        options: {
                            plugins: [{ removeTitle: false }, { prefixIds: true }],
                        },
                    },
                ],
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    cacheCompression: !!process.env.NODE_ENV,
                    compact: !!process.env.NODE_ENV,
                },
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: {} },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                ident: 'postcss',
                                plugins: [
                                    prefixer({
                                        prefix: '.decorator-wrapper',
                                        exclude: [
                                            /\b(\w*(M|m)odal\w*)\b/,
                                            'body',
                                            'body.no-scroll-mobil',
                                            '.siteheader',
                                            '.sitefooter',
                                            /\b(\w*lukk-container\w*)\b/,
                                            /\b(\w*close\w*)\b/,
                                            /\b(\w*decorator-dummy-app\w*)\b/,
                                            '.ReactModal__Overlay.ReactModal__Overlay--after-open.modal__overlay',
                                        ],
                                    }),
                                    autoprefixer({}),
                                ],
                            },
                        },
                    },
                    { loader: 'less-loader', options: {} },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '/css/[name].css',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.BROWSER': JSON.stringify(false),
        }),
        new SpriteLoaderPlugin({
            plainSprite: true,
        }),
        new MomentLocalesPlugin({
            localesToKeep: ['nb', 'nn', 'en'],
        }),
        new MomentTimezoneDataPlugin({
            startYear: moment().year() - 1,
            endYear: moment().year() + 1,
            matchZones: 'Europe/Oslo',
        }),
    ],
    optimization: {
        emitOnErrors: true,
        minimizer: [new CssMinimizerPlugin(), `...`],
        /*
        splitChunks: {
            chunks: 'all',
        },
        */
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },
};

const clientConfig = {
    target: 'web',
    entry: {
        client: './src/index.tsx',
    },
    ...commonConfig,
};

const serverConfig = {
    target: 'node',
    entry: {
        server: './src/server/server.ts',
    },
    externals: [
        nodeExternals({
            allowlist: [/^nav-frontend-.*$/, /\.(?!(?:jsx?|json)$).{1,5}$/i],
        }),
    ],
    ...commonConfig,
};

module.exports = [serverConfig, clientConfig];
