const { WebpackPluginServe } = require("webpack-plugin-serve");
const { MiniHtmlWebpackPlugin } = require("mini-html-webpack-plugin");

exports.devServer = () => ({
    watch: true,
    plugins: [
        new WebpackPluginServe({
            host: "127.0.0.1",
            port: process.env.PORT || 8080,
            static: "./dist", // Expose if output.path changes
            liveReload: true,
            waitForBuild: true,
        }),
    ],
});

exports.page = ({ title }) => ({
    plugins: [new MiniHtmlWebpackPlugin({ context: { title } })],
});

exports.loadCSS = () => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                // style-loader is used to ingest style into the DOM
                // css-loader allows for @import/url() syntax (only internal resources)
            },
        ],
    },
});
