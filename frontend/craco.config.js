const path = require('path');
const CracoLessPlugin = require('craco-less');
const NpmImportPlugin = require('less-plugin-npm-import');
const BUILD_PATH = path.resolve(__dirname, './build');

const removeCssHashPlugin = {
    overrideWebpackConfig: ({ webpackConfig, cracoConfig, pluginOptions, context: { env, paths } }) => {

        const plugins = webpackConfig.plugins;
        plugins.forEach(plugin => {

            const options = plugin.options;

            if (!options) {
                return;
            }

            if (options.filename && options.filename.endsWith('.css')) {
                options.filename = "static/css/[name].css";
                options.chunkFilename = "static/css/[name].chunk.css";
            }

        });
        return webpackConfig;
    }
};

module.exports = {
    plugins: [
        { plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    loader: new NpmImportPlugin({ prefix: '~' })
                }
            }
        },
        { plugin: removeCssHashPlugin },
    ],
    webpack: {
        configure: {
            output: {
                path: BUILD_PATH,
                filename: 'static/js/[name].js',
                chunkFilename: 'static/js/[name].chunk.js',
            },
        }
    }
};
