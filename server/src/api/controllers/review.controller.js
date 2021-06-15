import { handleHTTPError, HTTPError } from '../../utils';
import database from '../../database';

/*
Get all reviews
*/
const getReviews = async (req, res, next) => {
	try {
		// Get reviews from database
		let reviews = null;
		reviews = await database.ProductReview.findAll();

		// Send response
		res.status(200).json(reviews);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific order id
*/
const getReviewsByProductId = async (req, res, next) => {
	try {
		// Get review id parameter
		const { productId } = req.params;
		// Get product
		const product = await database.Product.findOne({ productId });
		// Get specific review from database
		const reviews = await product.getReviews();

		if (reviews === null) {
			throw new HTTPError(`Could not find reviews from product with id ${productId}!`, 404);
		}
		// Send response
		res.status(200).json(reviews);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Create a new review
*/
const createReview = async (req, res, next) => {
	try {
		// Get product id and user id from request body
		const { productId, userId } = req.params;
		// Get body from response
		const model = req.body;
		// Create a post
		const user = await database.User.findByPk(userId);
		const product = await database.Product.findByPk(productId);
		const newReview = await user.createReview(model);
		console.log(newReview);
		await product.addReview(newReview);		// Send response
		res.status(201).json(newReview);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Update an exisiting review
*/
const updateReview = async (req, res, next) => {
	try {
		// Get id parameter
		const { id } = req.params;
		console.log(id);
		// Get specific review from database
		const review = await database.ProductReview.findOne({ where: { id } });

		if (review === null) {
			throw new HTTPError(`Could not found the review with id ${id}!`, 404);
		}

		// Update a specific review
		const model = req.body;
		await database.ProductReview.update(model, {
			where: {
				id,
			},
		});

		// Send response
		res.status(200).json({ message: `Product with id ${id} has been updated.` });
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Delete an exisiting order
*/
const deleteReview = async (req, res, next) => {
	try {
		// Get id parameter
		const { id } = req.params;
		// Get specific order from database
		const order = await database.ProductReview.findOne({ where: { id } });

		if (order === null) {
			throw new HTTPError(`Could not found the order with id ${id}!`, 404);
		}

		// Delete a order with specified id
		await database.ProductReview.destroy({
			where: {
				id,
			},
		});

		// Send response
		res.status(200).json({ message: `Product with id ${id} has been deleted.` });
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export {
	getReviews, getReviewsByProductId, createReview, updateReview, deleteReview,
};
