const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require("dotenv-webpack");
const templates = path.resolve(__dirname, "./src/templates");

module.exports = {
    entry: "./src/index.tsx",
    mode: "development",
    devServer: {
        historyApiFallback: true
    },
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/",
        filename: "bundle.js"
    },
    resolve: {
        // Добавить разрешения '.ts' и '.tsx' к обрабатываемым
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules:[   //загрузчик для jsx
            {
                test: /\.tsx?$/,
                loaders: ['babel-loader','ts-loader']
            },
            {
                test: /\.(jsx?)$/,
                loaders: ['babel-loader']
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: templates + "/index.html",
            showErrors: true,
            minify: true,
            favicon: "./src/content/images/favicon.png"
        }),
        new Dotenv({
            path: "./settings.env"
        })
    ]
}