import { convertArrayToPagedObject, handleHTTPError, HTTPError } from '../../utils';
import database from '../../database';

/*
Get all categories
*/
const getCategories = async (req, res, next) => {
	try {
		// Get categories from database
		let categories = null;
			categories = await database.Category.findAll()

		// Send response
		res.status(200).json(categories);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get all parent categories
*/
const getParentCategories = async (req, res, next) => {
	try {
		// Get categories from database
		let categories = null;
		categories = await database.Category.findAll({where: {parentId: null}})

		// Send response
		res.status(200).json(categories);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get all sub categoriers by parent category Id  
 */

const getSubCategoriesByParentCategoryId = async (req, res, next) => {
	try {
		const { parentCategoryId } = req.params;
		// Get categories from database
		let categories = null;
			categories = await database.Category.findAll({where: {parentId: parentCategoryId}})

		// Send response
		res.status(200).json(categories);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/**
 Get parent category with it's child categories
 */

 const getSortedCategories = async (req, res, next) => {
	 try {
		const parentCategories = await database.Category.findAll({where: {parentId: null}});
		const childCategories = await database.Category.findAll({where: {parentId: !null}});
		console.log(parentCategories[0].dataValues)
		console.log(childCategories[0].dataValues)
	
		const categories = parentCategories.map(parent => {
			const children = childCategories.filter(child => child.dataValues.parentId == parent.dataValues.id)
			
			return {
				...parent.dataValues,
				children: [ ...children] 
			}
		})

		//send response
		res.status(200).json(categories)
	 } catch(error) {
		 handleHTTPError(error, next)
	 }
 }

/*
Get a specific category
*/
const getCategoryById = async (req, res, next) => {
	try {
		// Get categoryId parameter
		const { categoryId } = req.params;
		// Get specific category from database
		const category = await database.Category.findByPk(categoryId);

		if (category === null) {
			throw new HTTPError(`Could not found the category with id ${categoryId}!`, 404);
		}
		// Send response
		res.status(200).json(category);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Create a new category
*/
const createCategory = async (req, res, next) => {
	try {
		// Get body from response
		const model = req.body;
		// Create a post
		const createdModel = await database.Category.create(model);
		// Send response
		res.status(201).json(createdModel);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Update an exisiting category
*/
const updateCategory = async (req, res, next) => {
	try {
		// Get categoryId parameter
		const { categoryId } = req.params;
		console.log(categoryId);
		// Get specific category from database
		const category = await database.Category.findByPk(categoryId);

		if (category === null) {
			throw new HTTPError(`Could not found the category with id ${categoryId}!`, 404);
		}

		// Update a specific post
		const model = req.body;
		const updatedPost = await database.Category.update(model, {
			where: {
				id: categoryId,
			},
		});

		// Send response
		res.status(200).json(updatedPost);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Delete an exisiting category
*/
const deleteCategory = async (req, res, next) => {
	try {
		// Get categoryId parameter
		const { categoryId } = req.params;
		// Get specific category from database
		const category = await database.Category.findByPk(categoryId);

		if (category === null) {
			throw new HTTPError(`Could not found the category with id ${categoryId}!`, 404);
		}

		// Delete a category with specified id
		const message = await database.Category.destroy({
			where: {
				id: categoryId,
			},
		});

		// Send response
		res.status(200).json(message);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export {
	getSortedCategories, createCategory, deleteCategory, getCategoryById, getCategories, updateCategory,
};
