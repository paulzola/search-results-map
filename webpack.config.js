'use strict';

const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const clean = new CleanWebpackPlugin(['dist'], {
    root: path.resolve(),
    verbose: true,
    dry: false,
});

const entry = './src/index.js';

const output = {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    publicPath: '/',
};

const rules = [

    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
        },
    },

    {
        test: /\.html$/,
        use: {
            loader: 'html-loader',
        },
    },

    {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
    },

    {
        test: /\.(png|jpg|gif)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
        ],
    },

];

path.resolve(__dirname, './dist/main.js')

const plugins = [

    new HtmlWebPackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
        files: {
            css: path.resolve(__dirname, './dist/main.css'),
            js: path.resolve(__dirname, './dist/main.js'),
        },
        inject: false,
    }),

    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
    }),

];

const productionPlugins = [
    clean,
];

const config = env => ({
    entry,
    output,
    module: {rules},
    plugins: env === 'production' ? productionPlugins.concat(plugins) : plugins,
});

module.exports = config;
