const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const prefixer = require('postcss-prefix-selector');
const autoprefixer = require('autoprefixer');

const browserConfig = {
    mode: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
    target: 'web',
    entry: {
        client: './src/indexhydrat.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'buildfolder/'),
        filename: '[name].js',
        publicPath: '/person/nav-dekoratoren/',
    },
    devtool: 'cheap-module-source-map',
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
                options: {
                    reportFiles: ['src/**/*.{ts,tsx}', '!src/skip.ts'],
                    configFile: path.join(__dirname, './config/tsconfig.json'),
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
            'process.env.BROWSER': JSON.stringify(true),
        }),

        new SpriteLoaderPlugin({
            plainSprite: true,
        }),
    ],
};

module.exports = browserConfig;
