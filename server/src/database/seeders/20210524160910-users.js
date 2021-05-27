import 'babel-polyfill';

import database from '..';
import faker from 'faker';
import { v4 as uuidv4 } from 'uuid';

export default {
  up: async (queryInterface, Sequelize) => {
    console.log(database.User)
    let data = [];
    let amount = 50;
    const date = new Date();

    while(amount--){
      data.push({
        uuid: uuidv4(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        admin: false,
        createdAt: date,
        updatedAt: date,
      })
    }

    await queryInterface.bulkInsert('Users', data, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
