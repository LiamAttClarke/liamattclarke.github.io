const path = require("path");
const { mkdirp } = require("mkdirp");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HandlebarsPlugin = require("handlebars-webpack-plugin");

const SRC_PATH = path.join(__dirname, "src")
// Using /docs path because GitHub Pages can only serve from / or /docs
const PUBLIC_PATH = path.resolve(__dirname, "docs");
const TEMPLATES_PATH = path.join(SRC_PATH, "templates");
const PARTIALS_PATH = path.join(SRC_PATH, "partials");
const SITE_CONTENT_PATH = path.join(SRC_PATH, "content.json");

mkdirp(PUBLIC_PATH);

module.exports = {
  entry: "./src/main.js",
  output: {
    path: PUBLIC_PATH,
    filename: "bundle.js",
    clean: true
  },
  devServer: {
    static: {
      directory: PUBLIC_PATH
    },
    compress: true,
    port: 8080,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { context: "public", from: "./**/*", to: PUBLIC_PATH },
      ]
    }),
    new HandlebarsPlugin({
      data: SITE_CONTENT_PATH,
      entry: path.join(TEMPLATES_PATH, "**", "*.hbs"),
      partials: [path.join(PARTIALS_PATH, "**", "*.hbs")],
      output: path.join(PUBLIC_PATH, "[name].html"),
      getPartialId: (filePath) => path.basename(filePath, ".hbs")
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ]
      },
    ]
  }
};
