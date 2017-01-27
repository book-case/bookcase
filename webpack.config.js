const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
	entry: path.resolve(__dirname, 'app', 'app.js'),

	output: {
	  	path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist/',
		filename: 'bookcase.js'
	},

	module: {
		rules: [
			{
				test:/\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						'less': ExtractTextPlugin.extract('vue-style-loader!css-loader!less-loader')
					}
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: 'vue-style-loader!css-loader'
			},
			{
				test: /\.(png|jpg|gif|svg|ttf|woff|woff2|eot)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			}
		]
	},

	plugins: [
		new ExtractTextPlugin(path.resolve(__dirname, 'dist', 'bookcase.css')),
		new webpack.ProvidePlugin({
			'jQuery': 'jquery'
		})
	],
	devtool: '#eval-source-map'
};

if(process.env.NODE_ENV === 'production'){
	module.exports.devtool = '#source-map';
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	]);
}
