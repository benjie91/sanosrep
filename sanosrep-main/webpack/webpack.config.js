const { mode } = require("webpack-nano/argv");
const { merge } = require("webpack-merge");
const parts = require("./webpack.parts");

// Plugins
const WebpackNotifierPlugin = require('webpack-notifier');

const commonConfig = merge([
    { entry: ["./src"],
    plugins: [
        new WebpackNotifierPlugin({title: function (params) {
            return `Build status is ${params.status} with message ${params.message}`;
        }})
    ]},
    parts.page({ title: "Demo" }),

]);

const productionConfig = merge([]);

const developmentConfig = merge([
    { entry: ["webpack-plugin-serve/client"] },
    parts.devServer(),
]);

const getConfig = (mode) => {
    process.env.NODE_ENV = mode;
    switch (mode) {
        case "production":
            return merge(commonConfig, productionConfig, { mode });
        case "development":
            return merge(commonConfig, developmentConfig, { mode });
        default:
            throw new Error(`Trying to use an unknown mode, ${mode}`);
    }
};

module.exports = getConfig(mode);