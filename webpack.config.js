
// require("babel-polyfill");
const autoprefixer = require("autoprefixer");
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");


const config = {
  entry: ["./frontend/js/sleep-expert.js", "./frontend/sass/sleep-expert.scss"],
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: '/',
    filename: "./sleep-expert.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["react", "es2015"]
        }
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["react", "es2015"]
        }
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.(s*)css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader?-url"
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: () => [
                  require("postcss-flexbugs-fixes"),
                  autoprefixer({
                    browsers: [">1%", "last 4 versions", "Firefox ESR", "not ie < 9"],
                    flexbox: "no-2009"
                  })
                ]
              }
            },
            {
              loader: "sass-loader",
              options: {
                data: "$NODE_ENV: " + process.env.NODE_ENV + ";"
              }
            }
          ],
          fallback: "style-loader"
        })
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: false // true outputs JSX tags
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
    new ExtractTextPlugin({
      filename: "./sleep-expert.css"
    }),
    new BrowserSyncPlugin(
      {
        host: "localhost",
        port: 3000,
        server: { baseDir: ["dist"] }
      },
      {
        injectCss: true
      }
    )
  ]
};

if (process.env.NODE_ENV === "development") {
  config.devtool = "eval-source-map";
} else {
  config.plugins.push(new UglifyJSPlugin());
}

module.exports = config;
