import 'babel-polyfill';

import database from '../index';
database.connect();

export default {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(database.ProductReview.tableName, database.ProductReview.attributes);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable(database.ProductReview.tableName);
  }
};