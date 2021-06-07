import 'babel-polyfill';
import faker from 'faker';
import { v4 as uuidv4 } from 'uuid';
import database from '..'

export default {
  up: async (queryInterface, Sequelize) => {
    let users = [];
    let profiles = [];
    let amount = 20;
    const date = new Date();

    while(amount--){
      const id =  uuidv4()

      users.push({
        id: id,
        email: faker.internet.email(),
        password: faker.internet.password(),
        admin: false,
        createdAt: date,
        updatedAt: date,
      });

      profiles.push({
        UserId: id,
        firstName: faker.name.firstName(),
        lastName:faker.name.lastName(),
        street: faker.address.streetName(),
        zipcode: faker.address.zipCode(),
        city: faker.address.cityName(),
        country:faker.address.country(),
        dayOfBirth: -22074764,
        phoneNumber:faker.phone.phoneNumber(),
        createdAt: date,
        updatedAt: date,
      });
    };

    await queryInterface.bulkInsert('Users', users, {});
    await queryInterface.bulkInsert('Profiles', profiles, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Profiles', null, {});
  }
};
