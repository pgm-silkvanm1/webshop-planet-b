import 'babel-polyfill';

import database from '../index';
database.connect();

export default {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(database.Product.tableName, database.Product.attributes);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable(database.Product.tableName);
  }
};