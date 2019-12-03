const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const nodeExternals = require('webpack-node-externals');
const prefixer = require('postcss-prefix-selector');
const autoprefixer = require('autoprefixer');

const browserConfig = {
    mode: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
    target: 'node',
    externals: [
        nodeExternals({
            whitelist: [/^nav-frontend-.*$/, /\.(?!(?:jsx?|json)$).{1,5}$/i],
        }),
    ],
    entry: {
        server: path.resolve(__dirname, './src/server/ssr-server.tsx'),
    },
    output: {
        path: path.resolve(__dirname, 'buildfolder/'),
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        publicPath: '/person/nav-dekoratoren/',
    },

    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
    },
    stats: 'errors-only',
    module: {
        rules: [
            {
                test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.ico$/],
                loader: 'file-loader',
                options: {
                    name: './media/[name].[ext]',
                    emit: false,
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
                            ident: 'postcss',
                            plugins: [
                                prefixer({
                                    prefix: '.navno-dekorator',
                                    exclude: [
                                        /\b(\w*modal\w*)\b/,
                                        /\b(\w*Modal\w*)\b/,
                                        'body',
                                        '.siteheader',
                                        '.sitefooter',
                                        '.hodefot',
                                        /\b(\w*lukk-container\w*)\b/,
                                        /\b(\w*close\w*)\b/,
                                        '.ReactModal__Overlay.ReactModal__Overlay--after-open.modal__overlay',
                                    ],
                                }),
                                autoprefixer({}),
                            ],
                        },
                    },
                    { loader: 'less-loader', options: {} },
                ],
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /(node_modules)/,
                options: {
                    reportFiles: ['src/**/*.{ts,tsx}', '!src/skip.ts'],
                    configFile: path.join(__dirname, '/config/tsconfig.json'),
                },
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './css/[name].css',
        }),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.BROWSER': JSON.stringify(false),
        }),

        new SpriteLoaderPlugin({
            plainSprite: true,
        }),
    ],
};

module.exports = browserConfig;
