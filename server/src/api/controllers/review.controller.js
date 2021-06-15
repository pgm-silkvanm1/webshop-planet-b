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
		const reviews = await product.getProductReviews();

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
		const createdModel = await database.Review.create(model);
		// Send response
		res.status(201).json(createdModel);
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
		const review = await database.Review.findOne({ where: { id } });

		if (review === null) {
			throw new HTTPError(`Could not found the review with id ${id}!`, 404);
		}

		// Update a specific review
		const model = req.body;
		const updatedReview = await database.Review.update(model, {
			where: {
				id,
			},
		});

		// Send response
		res.status(200).json(updatedReview);
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
		const order = await database.Review.findOne({ where: { id } });

		if (order === null) {
			throw new HTTPError(`Could not found the order with id ${id}!`, 404);
		}

		// Delete a order with specified id
		const message = await database.Review.destroy({
			where: {
				id,
			},
		});

		// Send response
		res.status(200).json(message);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export {
	getReviews, getReviewsByProductId, createReview, updateReview, deleteReview,
};
