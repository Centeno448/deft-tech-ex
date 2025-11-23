import type { Configuration } from "webpack";
import TSconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: "./src/main/index.ts",
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins,
  resolve: {
    plugins: [new TSconfigPathsPlugin()],
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".scss", ".json"],
  },
};
