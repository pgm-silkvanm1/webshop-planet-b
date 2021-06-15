import 'babel-polyfill';
import faker from 'faker';
import { v4 as uuidv4 } from 'uuid';
import database from '..';

database.connect();

const createPromotions = async (amount = 20) => {
	const products = await database.Product.findAll();

	for (let i = 0; i < amount; i++) {
		const date = new Date();
		const promotion = {
			description: '-50%',
			voucher: uuidv4(),
			from: faker.date.recent(10, date),
			to: faker.date.future(10, date),
		};

		const product = products[Math.floor(Math.random() * products.length - 1)];
		product.createPromotion(promotion, { through: { selfGranted: false } });
	}
};

export default {
	up: async () => {
		await createPromotions(40);
	},

	down: async (queryInterface) => {
		await queryInterface.bulkDelete(database.Promotion.tableName, null, {});
	},
};
