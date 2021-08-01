import { Configuration } from "webpack";
import path from "path";

const isOptimizedBuild = true;

const config: Configuration = {
  mode: isOptimizedBuild ? "production" : undefined,

  entry: "./src/index.ts",

  module: {
    rules: [
      {
        test: /src\/\.tsx?$/,
        use: "ts-loader",
        exclude: [path.resolve(__dirname, "node_modules")],
      },
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  output: {
    filename: "index.js",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "out"),
  },
};

module.exports = config;
