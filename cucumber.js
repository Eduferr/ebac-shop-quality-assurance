module.exports = {
  default: {
    paths: [
      'api/features/**/*.feature'
    ],

    require: [
      'api/features/**/*.js'
    ],

    format: [
      'progress',
      'allure-cucumberjs/reporter'
    ],

    formatOptions: {
      resultsDir: 'allure/api-tests/api-results'
    },

    publishQuiet: true
  }
};
