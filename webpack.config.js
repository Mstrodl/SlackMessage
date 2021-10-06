const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const isDev = process.env.NODE_ENV != "production";

module.exports = {
  mode: isDev ? "development" : "production",
  entry: {
    index: {
      import: path.join(__dirname, "src/components/SlackMessage.jsx"),
      library: {
        name: "slackmessage",
        type: "umd",
      },
    },

    examples: {
      dependOn: "index",
      import: path.join(__dirname, "examples/example.js"),
    },
  },
  output: {
    filename: "[name].js",
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "src", "components"),
      "&": path.join(__dirname, "src", "styles"),
      "~": path.join(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", {targets: "last 5 Chrome versions"}],
              [
                "@babel/preset-react",
                {runtime: "automatic", development: isDev},
              ],
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              import: false,
              modules: true,
              esModule: true,
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: "[name].html",
    }),
  ],
};
