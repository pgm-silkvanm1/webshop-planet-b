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
					attributes: ['id', 'parentId', 'name'],
					through: { attributes: [] },
					unique: false,
				},
			],
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
		// Get specific product from database and include associated category, reviews and promotions
		const product = await database.Product.findOne({
			where: { id },
			include: [
				{
					model: database.Category,
					as: 'categories',
					through: {
						attributes: [],
					},
				},
				{
					model: database.ProductReview,
					as: 'reviews',
				},
				{
					model: database.Promotion,
					as: 'promotions',
				},
			],
		});

		if (product === null) {
			throw new HTTPError(`Could not find the product with id ${id}!`, 404);
		}
		// Send response
		res.status(200).json(product);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get products by category id
*/
const getProductsByCategory = async (req, res, next) => {
	try {
		// Get category Id parameter
		const { categoryId } = req.params;
		// Get category
		const category = await database.Category.findByPk(categoryId);
		// Get producst associated with category
		let products = [];
		if (!category.dataValues.parentId) {
			products = await database.Product.findAll({
				include: {
					model: database.Category,
					as: 'categories',
					where: { parentId: categoryId },
					attributes: ['id', 'parentId'],
				},
			});
		} else {
			products = await category.getProducts();
		}
		// Check if products exist
		if (products === null) {
			throw new HTTPError(`Could not find the products from category with id ${categoryId}!`, 404);
		}
		// Send response
		res.status(200).json(products);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/**
 * Get all reviews from one product
 */
const getProductReviews = async (req, res, next) => {
	try {
		// Get product id parameter
		const { id } = req.params;
		// Get product
		const product = await database.Product.findOne({ id });
		// Get all reviews associated with product
		const reviews = await product.getReviews();

		if (reviews === null) {
			throw new HTTPError(`Could not find reviews from product with id ${id}!`, 404);
		}
		// Send response
		res.status(200).json(reviews);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/**
 * Get all reviews from one product
 */
const getProductPromotions = async (req, res, next) => {
	try {
		// Get product id parameter
		const { id } = req.params;
		// Get product by product id
		const product = await database.Product.findOne({ id });
		// Get all promotions associated with product
		const promotions = await product.getPromotions();
		// Check if promotions exist
		if (promotions === null) {
			throw new HTTPError(`Could not find promotions from product with id ${id}!`, 404);
		}
		// Send response
		res.status(200).json(promotions);
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
		// Create a product
		const createdModel = await database.Product.create(model);
		// Send response
		res.status(201).json(createdModel);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Update an exisiting product
*/
const updateProduct = async (req, res, next) => {
	try {
		// Get uuid parameter
		const { id } = req.params;

		// Get specific product from database
		const product = await database.Product.findByPk(id);
		// Check if product exists
		if (product === null) {
			throw new HTTPError(`Could not find the product with id ${id}!`, 404);
		}

		// Update a specific product
		const model = req.body;
		await database.Product.update(model, {
			where: {
				id,
			},
		});

		// Send response
		res.status(200).json({ message: `Updated product with id ${id}` });
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Delete an exisiting product
*/
const deleteProduct = async (req, res, next) => {
	try {
		// Get product i parameter
		const { id } = req.params;
		// Get specific product from database
		const product = await database.Product.findByPk(id);
		// Check if product exists
		if (product === null) {
			throw new HTTPError(`Could not find the product with id ${id}!`, 404);
		}
		// Delete a product with specified id
		await database.Product.destroy({
			where: {
				id,
			},
		});

		// Send response
		res.status(200).json({ message: `Deleted product with id ${id}` });
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export {
	createProduct,
	getProducts,
	getProductById,
	getProductsByCategory,
	getProductReviews,
	getProductPromotions,
	updateProduct,
	deleteProduct,
};
