const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const prefixer = require('postcss-prefix-selector');
const autoprefixer = require('autoprefixer');
const nodeExternals = require('webpack-node-externals');
const modifySelectors = require('modify-selectors');

const prefixExclusions = [
    'body',
    'body.no-scroll-mobil',
    '.siteheader',
    '.sitefooter',
    /\b(\w*decorator-dummy-app\w*)\b/,
    '#nav-chatbot',
    ':root',
    '.decorator-wrapper',
];

const prefixExclusionsDsCss = ['.decorator-wrapper'];

const commonConfig = {
    mode: process.env.NODE_ENV || 'development',
    devtool: 'source-map',
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
                test: [/\.gif$/, /\.jpe?g$/, /\.png$/, /\.ico$/, /\.svg$/, /\.webmanifest$/],
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
                loader: 'svgo-loader',
                options: {
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'preset-default',
                                params: {
                                    overrides: {
                                        removeTitle: false,
                                        prefixIds: true,
                                    },
                                },
                            },
                        ],
                    },
                },
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
                test: /\.(js)$/,
                exclude: /@babel(?:\/|\\{1,2})runtime/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    cacheCompression: !!process.env.NODE_ENV,
                    presets: [['babel-preset-react-app/dependencies', { helpers: true }]],
                    sourceMaps: false,
                },
            },
            {
                test: /\.scss$/,
                exclude: /\.module\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                ident: 'postcss',
                                plugins: [
                                    prefixer({
                                        prefix: '.decorator-wrapper',
                                        exclude: prefixExclusions,
                                    }),
                                    autoprefixer({}),
                                ],
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.module\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]__[hash:base64:5]',
                            },
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                ident: 'postcss',
                                plugins: [
                                    prefixer({
                                        prefix: ':global(.decorator-wrapper)',
                                        exclude: prefixExclusions,
                                    }),
                                    autoprefixer({}),
                                ],
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                include: /@navikt(\\|\/)ds-css/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                ident: 'postcss',
                                plugins: [
                                    modifySelectors({
                                        enabled: true,
                                        replace: [{ match: /^(:root|html|body)$/, with: '.decorator-wrapper' }],
                                    }),
                                    prefixer({
                                        prefix: '.decorator-wrapper',
                                        exclude: prefixExclusionsDsCss,
                                    }),
                                    autoprefixer({}),
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(less|css)$/,
                exclude: /@navikt(\\|\/)ds-css/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                ident: 'postcss',
                                plugins: [
                                    prefixer({
                                        prefix: '.decorator-wrapper',
                                        exclude: prefixExclusions,
                                    }),
                                    autoprefixer({}),
                                ],
                            },
                        },
                    },
                    'less-loader',
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
    ],
    optimization: {
        emitOnErrors: true,
        minimizer: [new CssMinimizerPlugin(), `...`],
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },
};

const clientConfig = {
    target: ['web', 'es5'],
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
            allowlist: [
                /^nav-frontend-.*$/,
                /^@navikt\/ds-react.*$/,
                /^@navikt\/nav-dekoratoren-.*$/,
                /^@babel\/runtime.*$/,
                /\.(?!(?:jsx?|json)$).{1,5}$/i,
            ],
        }),
    ],
    ...commonConfig,
};

module.exports = [serverConfig, clientConfig];
