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
        client: './src/index.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/dekoratoren',
        filename: '[name].js',
    },
    devtool: 'cheap-module-source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
        alias: {
            src: path.resolve(__dirname, './src'),
            api: path.resolve(__dirname, './src/api'),
            ikoner: path.resolve(__dirname, './src/ikoner'),
            komponenter: path.resolve(__dirname, './src/komponenter'),
            providers: path.resolve(__dirname, './src/providers'),
            reducers: path.resolve(__dirname, './src/reducers'),
            state: path.resolve(__dirname, './src/state'),
            tekster: path.resolve(__dirname, './src/tekster'),
            types: path.resolve(__dirname, './src/types'),
            utils: path.resolve(__dirname, './src/utils')
        }
    },
    stats: 'errors-only',
    module: {
        rules: [
            { parser: { requireEnsure: false } },

            {
                test: /\.(js|jsx|ts|tsx)$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            formatter: 'react-dev-utils/eslintFormatter',
                            eslintPath: 'eslint',
                        },
                        loader: 'eslint-loader',
                    },
                ],
                include: path.resolve(__dirname, 'src'),
            },
            {
                oneOf: [
                    {
                        test: [
                            /\.svg$/,
                            /\.gif$/,
                            /\.jpe?g$/,
                            /\.png$/,
                            /\.ico$/,
                        ],
                        loader: 'file-loader',
                        options: {
                            name: '/media/[name].[ext]',
                        },
                    },
                    {
                        test: /\.(js|jsx|ts|tsx)$/,
                        include: path.resolve(__dirname, 'src'),
                        loader: 'babel-loader',
                        options: {
                            customize: require.resolve(
                                'babel-preset-react-app/webpack-overrides'
                            ),
                            presets: [
                                [
                                    'react-app',
                                    { flow: false, typescript: true },
                                ],
                            ],

                            plugins: [
                                [
                                    require('babel-plugin-named-asset-import'),
                                    {
                                        loaderMap: {
                                            svg: {
                                                ReactComponent:
                                                    '@svgr/webpack?-svgo,+ref![path]',
                                            },
                                        },
                                    },
                                ],
                            ],
                            cacheDirectory: true,
                            cacheCompression: !!process.env.NODE_ENV,
                            compact: !!process.env.NODE_ENV,
                        },
                    },
                    {
                        test: /\.(js)$/,
                        exclude: /@babel(?:\/|\\{1,2})runtime/,
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            configFile: false,
                            compact: false,
                            presets: [
                                [
                                    'babel-preset-react-app/dependencies',
                                    { helpers: true },
                                ],
                            ],
                            cacheDirectory: true,
                            cacheCompression: !!process.env.NODE_ENV,
                            sourceMaps: false,
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
                                                /\b(\w*(M|m)odal\w*)\b/,
                                                'body',
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
                            { loader: 'less-loader', options: {} },
                        ],
                    },
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
            'process.env.BROWSER': JSON.stringify(true),
        }),

        new SpriteLoaderPlugin({
            plainSprite: true,
        }),
    ],
};

module.exports = browserConfig;
