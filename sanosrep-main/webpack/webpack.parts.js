const { WebpackPluginServe } = require("webpack-plugin-serve");
const { MiniHtmlWebpackPlugin } = require("mini-html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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

exports.extractCSS = ({ options = {}, loaders = [] } = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader, options },
                    "css-loader",
                ].concat(loaders),
                sideEffects: true,
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
    ],
});

exports.tailwind = () => ({
    loader: "postcss-loader",
    options: {
        postcssOptions: {
            plugins: [
                require("tailwindcss")({
                    content: ["./src/**/*.{html,js}"],
                    theme: {
                        extend: {},
                    },
                    plugins: [],
                }),
            ],
        },
    },
});

exports.autoprefix = () => ({
    loader: "postcss-loader",
    options: {
        postcssOptions: { plugins: [require("autoprefixer")()] },
    },
});
