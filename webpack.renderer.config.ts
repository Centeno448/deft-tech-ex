import type { Configuration } from "webpack";
import TSconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";

rules.push({
  test: /\.s[ac]ss$/,
  use: [
    { loader: "style-loader" },
    { loader: "css-loader" },
    { loader: "sass-loader" },
  ],
});

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    plugins: [new TSconfigPathsPlugin()],
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".scss"],
  },
};
