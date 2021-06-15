import 'babel-polyfill';
import faker from 'faker';
import { v4 as uuidv4 } from 'uuid';
import hashPassword from '../../utils/hashPassword';

export default {
	up: async (queryInterface) => {
		const users = [];
		const profiles = [];
		let amount = 20;
		const date = new Date();

		while (amount--) {
			const id = uuidv4();

			users.push({
				id,
				email: faker.internet.email(),
				password: hashPassword(faker.internet.password()),
				admin: false,
				createdAt: date,
				updatedAt: date,
			});

			profiles.push({
				UserId: id,
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				image: faker.image.avatar(),
				street: faker.address.streetName(),
				zipcode: faker.address.zipCode(),
				city: faker.address.cityName(),
				country: faker.address.country(),
				dayOfBirth: -22074764,
				phoneNumber: faker.phone.phoneNumber(),
				createdAt: date,
				updatedAt: date,
			});
		}

		await queryInterface.bulkInsert('Users', users, {});
		await queryInterface.bulkInsert('Profiles', profiles, {});
	},

	down: async (queryInterface) => {
		await queryInterface.bulkDelete('Users', null, {});
		await queryInterface.bulkDelete('Profiles', null, {});
	},
};
