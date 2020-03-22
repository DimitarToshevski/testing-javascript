module.exports = {
  collectCoverageFrom: ['**/assets/js/*.js'],
  coverageThreshold: {
    global: {
      statements: 25,
      branches: 25,
      functions: 20,
      lines: 25,
    },
    // '**/assets/js/util.js': {
    //   statements: 60,
    //   branches: 70,
    //   functions: 60,
    //   lines: 60,
    // },
  },
};
