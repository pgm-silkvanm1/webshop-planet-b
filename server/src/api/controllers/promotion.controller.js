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
const getPromotionByProductId = async (req, res, next) => {
	try {
		// Get promotion id parameter
		const { id } = req.params;
		// Get specific promotion from database
		const promotion = await database.Promotion.findOne({where: {id: id}});

		if (promotion === null) {
			throw new HTTPError(`Could not found the promotion with id ${id}!`, 404);
		}
		// Send response
		res.status(200).json(promotion);
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
		const promotion = await database.Promotion.findOne({where: {id: id}});

		if (promotion === null) {
			throw new HTTPError(`Could not found the promotion with id ${id}!`, 404);
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
		// Get body from response
		const model = req.body;
		// Create a post
		const createdModel = await database.Promotion.create(model);
		// Send response
		res.status(201).json(createdModel);
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
		const promotion = await database.Promotion.findOne({where: { id: id }});

		if (promotion === null) {
			throw new HTTPError(`Could not found the promotion with id ${id}!`, 404);
		}

		// Update a specific promotion
		const model = req.body;
		const updatedPromotion = await database.Promotion.update(model, {
			where: {
				id: id,
			},
		});

		// Send response
		res.status(200).json(updatedPromotion);
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
		const promotion = await database.Promotion.findOne({where: {id: id}});

		if (promotion === null) {
			throw new HTTPError(`Could not found the promotion with id ${id}!`, 404);
		}

		// Delete a promotion with specified id
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
