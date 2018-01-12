module.exports = {
    entry: './client/src/App.jsx',
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
    }
};