import path from 'path';
import webpack from 'webpack';

const config = {
  entry: "./src/index.tsx",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        exclude: /(node_modules)/,
        loader: "ts-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: [".ts", ".js", ".tsx"] },
  output: {
    path: path.resolve(__dirname, "public/"),
    filename: "bundle.js"
  }
};

export default config;