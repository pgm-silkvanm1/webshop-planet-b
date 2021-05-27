import 'babel-polyfill';

import database from '../index';
database.connect();

export default {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(database.ProductHasCategory.tableName, database.ProductHasCategory.attributes);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable(database.ProductHasCategory.tableName);
  }
};