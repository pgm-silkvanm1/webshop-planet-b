import 'babel-polyfill';

import database from '../index';
database.connect();

export default {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(database.Promotion.tableName, database.Promotion.attributes);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable(database.Promotion.tableName);
  }
};
