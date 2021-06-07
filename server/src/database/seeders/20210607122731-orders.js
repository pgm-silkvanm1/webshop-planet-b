// import/no-extraneous-dependencies
import 'babel-polyfill';
import faker from 'faker';
import database from '..';

database.connect();

const createOrders= async () => {
	const users = await database.User.findAll();
	
	users.forEach(user => {
		const date = new Date();
		const order = {
			orderStatus: 'ordered',
			totalPrice: faker.commerce.price(),
			paymentStatus: 'pending',
			paymentType: 'creditcard',
		};

		user.createOrder(order, { through: { selfGranted: false }});
	
	})

};

const createOrderProducts= async () => {
	const orders = await database.Order.findAll();
	const products = await database.Product.findAll();
	
	orders.forEach(order => {
		let orderProducts = [];
		const amount = Math.floor(Math.random() * 10);

		for(let i = 0; i < amount; i++){
			orderProducts.push(products[Math.floor(Math.random()*products.length-1)])
		};
		
		orderProducts.forEach(product => {
			order.addProduct(product, {through: { selfGranted: false }});
		});
	});
};

export default {
	up: async (queryInterface, Sequelize) => {
		await createOrders();
		await createOrderProducts();
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete(database.Category.tableName, null, {});
	},
};
