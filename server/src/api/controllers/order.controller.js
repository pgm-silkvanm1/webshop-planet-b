import { handleHTTPError, HTTPError } from '../../utils';
import database from '../../database';

/*
Get all orders
*/
const getOrders = async (req, res, next) => {
	try {
		// Get orders from database
		let orders = null;
		orders = await database.Order.findAll();

		// Send response
		res.status(200).json(orders);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific order id
*/
const getOrderById = async (req, res, next) => {
	try {
		// Get order id parameter
		const { id } = req.params;
		// Get specific order from database
		const order = await database.Order.findOne({
			where: { id },
			include: {
				model: database.Product,
				as: 'products',
				through: {
					attributes: [],
				},
			},
		});

		if (order === null) {
			throw new HTTPError(`Could not find the order with id ${id}!`, 404);
		}
		// Send response
		res.status(200).json(order);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Create a new order
*/
const createOrder = async (req, res, next) => {
	try {
		const { userId } = req.params;
		// Get body from response
		const order = req.body;
		// Get user
		const user = await database.User.findByPk(userId);
		// Create new order associated with user
		const createdOrder = user.createOrder(order);
		// Send response
		res.status(201).json(createdOrder);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Create a new order
*/
const addProductToOrder = async (req, res, next) => {
	try {
		// Get body from response
		const { orderId } = req.params;
		const products = req.body;
		const order = await database.Order.findByPk(orderId);
		await order.addProducts(products);

		// Send response
		res.status(201).json({ message: `Products with ids ${products} has been added to order with id ${orderId}` });
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Update an exisiting order
*/
const updateOrder = async (req, res, next) => {
	try {
		// Get id parameter
		const { id } = req.params;
		console.log(id);
		// Get specific order from database
		const order = await database.Order.findOne({ where: { id } });

		if (order === null) {
			throw new HTTPError(`Could not find the order with id ${id}!`, 404);
		}

		// Update a specific order
		const model = req.body;
		await database.Order.update(model, {
			where: {
				id,
			},
		});

		// Send response
		res.status(200).json({ message: `Order with id ${id} has been updated.` });
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Delete an exisiting order
*/
const deleteOrder = async (req, res, next) => {
	try {
		// Get id parameter
		const { id } = req.params;
		// Get specific order from database
		const order = await database.Order.findOne({ where: { id } });

		if (order === null) {
			throw new HTTPError(`Could not find the order with id ${id}!`, 404);
		}

		// Delete a order with specified id
		await database.Order.destroy({
			where: {
				id,
			},
		});

		// Send response
		res.status(200).json({ message: `Order with id ${id} has been deleted.` });
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export {
	getOrders,
	getOrderById,
	createOrder,
	addProductToOrder,
	updateOrder,
	deleteOrder,
};
