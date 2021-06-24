var path = require('path')
const nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    mode: "production",
    entry: ['./src/server'], // .js after index is optional
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    externals: [nodeExternals()],
    module: {   //設定你的檔案選項
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env']
                        ]
                    }
                }
            },
        ],
    },
}