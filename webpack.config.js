module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
};
