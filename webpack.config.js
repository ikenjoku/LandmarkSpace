const webpack = require('webpack');
const path = require('path');


module.exports = {
    entry: {
        vendor: ['react', 'react-dom', 'whatwg-fetch', 'react-bootstrap', 'react-router-bootstrap', 'react-router-dom'],
        app: './client/src/App.jsx',
    },
    output: {
        filename: 'app.bundle.js',
        path: __dirname + '/client/public'
    },
    module: {
        rules: [{
            test: /\.jsx$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'env']
                }
            }

        }, ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js'
        })
    ],
    devServer: {
        port: 8000,
        contentBase: path.join(__dirname, 'client', 'public'),
        proxy: {
            '/api/*': {
                target: 'http://localhost:4500'
            }
        }
    },
    devtool: 'source-map'
};