const { merge } = require("webpack-merge");

const parts = require("./webpack.parts");

module.exports = merge([
    {
        entry: ["./src"],
    },
    parts.page({ title: "Demo" }),
    parts.loadCSS(),
]);
