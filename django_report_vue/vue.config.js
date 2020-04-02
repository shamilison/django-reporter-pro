const BundleTracker = require("webpack-bundle-tracker");
const path = require('path');

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    publicPath: "http://127.0.0.1:9899/static/",
    outputDir: 'dist',
    assetsDir: '',
    configureWebpack: {
        resolve: {
            alias: {
                src: resolve('src')
            }
        },
    },
    chainWebpack: config => {
        config.entryPoints.delete('app');

        config.optimization
            .splitChunks(false);

        config
            .plugin('BundleTracker')
            .use(BundleTracker, [{filename: '../django_report_vue/webpack-application-stats.json'}]);

        config
            .entry('application')
            .add('./src/application/application.js')
            .end();

        // Preferences | Languages & Frameworks | JavaScript | Webpack | Set Webpack path
        // config.resolve.alias
        //     .set('@', resolve('src'));

        config.devServer
            .public('http://127.0.0.1:9899')
            .host('127.0.0.1')
            .port(9899)
            .hotOnly(true)
            .watchOptions({poll: 1000})
            .https(false)
            .headers({"Access-Control-Allow-Origin": ["*"]})
    },
};