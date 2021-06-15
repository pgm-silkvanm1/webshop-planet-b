import 'babel-polyfill';
import faker from 'faker';
import { v4 as uuidv4 } from 'uuid';
import database from '..';

database.connect();

const createProducts = (amount = 20) => {
	const products = [];

	for (let i = 0; i < amount; i++) {
		const date = new Date();
		const name = faker.commerce.productName();

		products.push({
			id: uuidv4(),
			name,
			synopsis: faker.lorem.sentence(),
			description: faker.commerce.productDescription(),
			image: `https://source.unsplash.com/500x500?sig=1&${faker.helpers.slugify(name)}`,
			price: faker.commerce.price(),
			stock: Math.floor(Math.random() * 1000),
			createdAt: date,
			updatedAt: date,
		});
	}

	return products;
};

export default {
	up: async (queryInterface) => {
		await queryInterface.bulkInsert(database.Product.tableName, createProducts(100), {});
	},

	down: async (queryInterface) => {
		await queryInterface.bulkDelete(database.Product.tableName, null, {});
	},
};
