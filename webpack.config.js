const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const prefixer = require('postcss-prefix-selector');
const autoprefixer = require('autoprefixer');
const nodeExternals = require('webpack-node-externals');

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
                loader: 'svgo-loader',
                options: {
                    plugins: [{ removeTitle: false }, { prefixIds: true }],
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
                test: /\.(less|css)$/,
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
                                            /\b(\w*nav-veileder\w*)\b/,
                                            /\b(\w*nav-veilederpanel\w*)\b/,
                                            /\b(\w*utloggingsvarsel\w*)\b/,
                                            '.siteheader',
                                            '.sitefooter',
                                            /\b(\w*lukk-container\w*)\b/,
                                            /\b(\w*close\w*)\b/,
                                            /\b(\w*decorator-dummy-app\w*)\b/,
                                            '.ReactModal__Overlay.ReactModal__Overlay--after-open.modal__overlay',
                                            '#nav-chatbot',
                                            ':root',
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
