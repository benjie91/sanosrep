const { merge } = require("webpack-merge");

const parts = require("./webpack.parts");

module.exports = merge([
    {
        entry: ["./src"],
        // output: { clean: true },
    },
    parts.page({ title: "Demo" }),
    parts.extractCSS({ loaders: [parts.autoprefix(), parts.tailwind()] }),
]);
