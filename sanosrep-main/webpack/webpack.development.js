const { mode } = require("webpack-nano/argv");
const { merge } = require("webpack-merge");

const baseConfig = require("./webpack.base")
const parts = require("./webpack.parts");
const WebpackNotifierPlugin = require("webpack-notifier");

const developmentConfig = merge([
    {
        entry: ["webpack-plugin-serve/client"],
        plugins: [
            new WebpackNotifierPlugin({title: function (params) {
                    return `Build status is ${params.status} with message ${params.message}`;
                }})
        ]
    },
    parts.devServer(),
]);

const initDevelopmentEnv = (mode) => {
    console.log(`Running Development Build...`)
    process.env.NODE_ENV = mode;
    return merge(baseConfig, developmentConfig, { mode });
}

module.exports = initDevelopmentEnv(mode)