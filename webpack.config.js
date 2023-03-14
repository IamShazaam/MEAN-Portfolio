module.exports = {
  // ...
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      timers: require.resolve('timers-browserify'),
    },
  },
};
