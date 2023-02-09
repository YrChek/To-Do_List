const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.commom.config');
const productionConfig = require('./webpack.production.config');
const developmentConfig = require('./webpack.development.config');

module.exports = (env, args) => {
  switch(args.mode) {
    case 'development':
      return merge (commonConfig, developmentConfig);
    case 'production':
      return merge (commonConfig, productionConfig);
    default:
      throw new Error ('Конфигурация не выбрана');
  }
}
