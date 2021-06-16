import 'babel-polyfill';
import database from '..';

database.connect();

const createProductCategories = async () => {
	const products = await database.Product.findAll();
	const categories = await database.Category.findAll();

	products.forEach((product) => {
		const productCategories = [];
		const amount = Math.floor(Math.random() * 5);

		for (let i = 0; i < amount; i++) {
			productCategories.push(categories[Math.floor(6 + Math.random() * 16)]);
		}

		productCategories.forEach((productCategory) => {
			product.addCategory(productCategory, { through: { selfGranted: false } });
		});
	});
};

export default {
	up: async () => {
		await createProductCategories();
	},

	down: async (queryInterface) => {
		await queryInterface.bulkDelete('ProductHasCategories', null, {});
	},
};
