import 'babel-polyfill';

import database from '../index';
database.connect();

export default {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(database.OrderProduct.tableName, database.OrderProduct.attributes);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable(database.OrderProduct.tableName);
  }
};
