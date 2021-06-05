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
const getOrdersByorderId = async (req, res, next) => {
	try {
		// Get order id parameter
		const { id } = req.params;
		// Get specific order from database
		const order = await database.order.findOne({where: {id: id}});

		if (order === null) {
			throw new HTTPError(`Could not found the order with id ${id}!`, 404);
		}
		// Send response
		res.status(200).json(order);
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
		const order = await database.Order.findOne({where: {id: id}});

		if (order === null) {
			throw new HTTPError(`Could not found the order with id ${id}!`, 404);
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
		// Get body from response
		const model = req.body;
		// Create a post
		const createdModel = await database.Order.create(model);
		// Send response
		res.status(201).json(createdModel);
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
		const order = await database.Order.findOne({where: { id: id }});

		if (order === null) {
			throw new HTTPError(`Could not found the order with id ${id}!`, 404);
		}

		// Update a specific order
		const model = req.body;
		const updatedOrder = await database.Order.update(model, {
			where: {
				id: id,
			},
		});

		// Send response
		res.status(200).json(updatedOrder);
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
		const order = await database.Order.findOne({where: {id: id}});

		if (order === null) {
			throw new HTTPError(`Could not found the order with id ${id}!`, 404);
		}

		// Delete a order with specified id
		const message = await database.Order.destroy({
			where: {
				id: id,
			},
		});

		// Send response
		res.status(200).json(message);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export {
	
};
