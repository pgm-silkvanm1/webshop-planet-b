import { handleHTTPError, HTTPError } from '../../utils';
import database from '../../database';

/*
Get all products
*/
const getProducts = async (req, res, next) => {
	try {
		// Get users from database
		let products = null;		
        products = await database.Product.findAll({
			include: [
				{
					model: database.Category,
					as: 'categories',
					attributes:['id', 'parentId', 'name'],
					through: { attributes: [] },
					unique: false
				}
			]
		});

		// Send response
		res.status(200).json(products);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific product by id
*/
const getProductById = async (req, res, next) => {
	try {
		// Get userId parameter
		const { id } = req.params;
		console.log(id)
		// Get specific user from database
		const product = await database.Product.findByPK(id);

		if (product === null) {
			throw new HTTPError(`Could not found the product with id ${id}!`, 404);
		}
		// Send response
		res.status(200).json(user);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Create a new product
*/
const createProduct = async (req, res, next) => {
	try {
		// Get body from response
		const model = req.body;
		// Create a post
		const createdModel = await database.Product.create(model);
		// Send response
		res.status(201).json(createdModel);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Update an exisiting user
*/
const updateProduct = async (req, res, next) => {
	try {
		// Get uuid parameter
		const { id } = req.params;

		// Get specific user from database
		const product = await database.Product.findByPK(id);

		if (product === null) {
			throw new HTTPError(`Could not found the product with id ${id}!`, 404);
		}

		// Update a specific user
		const model = req.body;
		const updatedProduct = await database.Product.update(model, {
			where: {
				id: id,
			},
		});

		// Send response
		res.status(200).json(updatedProduct);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Delete an exisiting user
*/
const deleteProduct = async (req, res, next) => {
	try {
		// Get uuid parameter
		const { id } = req.params;
		// Get specific user from database
		const product = await database.Product.findByPK(id);

		if (product === null) {
			throw new HTTPError(`Could not found the product with id ${id}!`, 404);
		}

		// Delete a user with specified id
		const message = await database.Product.destroy({
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
	createProduct, getProducts, getProductById, updateProduct, deleteProduct
};

