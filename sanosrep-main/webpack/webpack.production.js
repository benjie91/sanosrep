const {mode} = require("webpack-nano/argv");
const {merge} = require("webpack-merge");

const baseConfig = require("./webpack.base");
const parts = require("./webpack.parts");

const productionConfig = merge([]);

const initProductionEnv = (mode) => {
    console.log(`Building Production Build...`)
    process.env.NODE_ENV = mode;
    return merge(baseConfig, productionConfig, { mode });
}

module.exports = initProductionEnv(mode)