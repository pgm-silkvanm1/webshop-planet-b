import { handleHTTPError, HTTPError } from '../../utils';
import database from '../../database';

/*
Get all promotions
*/
const getPromotions = async (req, res, next) => {
	try {
		// Get promotions from database
		let promotions = null;
		promotions = await database.Promotion.findAll();

		// Send response
		res.status(200).json(promotions);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific promotion id
*/
const getPromotionsByProductId = async (req, res, next) => {
	try {
		// Get product id parameter
		const { productId } = req.params;
		// Get specific product from database
		const product = await database.Product.findByPk(productId);
		// Get all promotions associated with the product
		const promotions = await product.getPromotions();

		if (product === null) {
			throw new HTTPError(`Could not find the promotion with id ${productId}!`, 404);
		}

		if (promotions === null || promotions.length === 0) {
			throw new HTTPError(`Product with id ${productId} has no promotions`, 404);
		}
		// Send response
		res.status(200).json(promotions);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific promotion id
*/
const getPromotionById = async (req, res, next) => {
	try {
		// Get promotion id parameter
		const { id } = req.params;
		// Get specific promotion from database
		const promotion = await database.Promotion.findOne({ where: { id } });

		if (promotion === null) {
			throw new HTTPError(`Could not find the promotion with id ${id}!`, 404);
		}
		// Send response
		res.status(200).json(promotion);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Create a new promotion
*/
const createPromotion = async (req, res, next) => {
	try {
		const { productId } = req.params;
		// Get body from response
		const model = req.body;

		const product = await database.Product.findByPk(productId);
		await product.createPromotion(model);
		// Send response
		res.status(201).json(model);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Update an exisiting promotion
*/
const updatePromotion = async (req, res, next) => {
	try {
		// Get id parameter
		const { id } = req.params;
		console.log(id);
		// Get specific promotion from database
		const promotion = await database.Promotion.findOne({ where: { id } });

		if (promotion === null) {
			throw new HTTPError(`Could not found the promotion with id ${id}!`, 404);
		}

		// Update a specific promotion
		const model = req.body;
		await database.Promotion.update(model, {
			where: {
				id,
			},
		});

		// Send response
		res.status(200).json({ message: `Promotion with id ${id} has been updated` });
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Delete an exisiting promotion
*/
const deletePromotion = async (req, res, next) => {
	try {
		// Get id parameter
		const { id } = req.params;
		// Get specific promotion from database
		const promotion = await database.Promotion.findOne({ where: { id } });

		if (promotion === null) {
			throw new HTTPError(`Could not found the promotion with id ${id}!`, 404);
		}

		// Delete a promotion with specified id
		await database.Order.destroy({
			where: {
				id,
			},
		});

		// Send response
		res.status(200).json({ message: `Promotion with id ${id} has been deleted` });
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export {
	getPromotions,
	getPromotionById,
	getPromotionsByProductId,
	createPromotion,
	updatePromotion,
	deletePromotion,
};
