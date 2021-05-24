import { handleHTTPError, HTTPError } from '../../utils';
import database from '../../database';

/*
Get all users
*/
const getUsers = async (req, res, next) => {
	try {
		// Get users from database
		let users = null;		
        users = await database.User.findAll();

		// Send response
		res.status(200).json(users);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific user uuid
*/
const getUserByUuid = async (req, res, next) => {
	try {
		// Get userId parameter
		const { uuid } = req.params;
		// Get specific user from database
		const user = await database.User.findOne({where: {uuid: uuid}});

		if (user === null) {
			throw new HTTPError(`Could not found the user with id ${uuid}!`, 404);
		}
		// Send response
		res.status(200).json(user);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Create a new user
*/
const createUser = async (req, res, next) => {
	try {
		// Get body from response
		const model = req.body;
		// Create a post
		const createdModel = await database.User.create(model);
		// Send response
		res.status(201).json(createdModel);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Update an exisiting user
*/
const updateUser = async (req, res, next) => {
	try {
		// Get uuid parameter
		const { uuid } = req.params;
		console.log(uuid);
		// Get specific user from database
		const user = await database.User.findOne({where: { uuid: uuid }});

		if (user === null) {
			throw new HTTPError(`Could not found the user with id ${uuid}!`, 404);
		}

		// Update a specific user
		const model = req.body;
		const updatedUser = await database.User.update(model, {
			where: {
				uuid: uuid,
			},
		});

		// Send response
		res.status(200).json(updatedUser);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Delete an exisiting user
*/
const deleteUser = async (req, res, next) => {
	try {
		// Get uuid parameter
		const { uuid } = req.params;
		// Get specific user from database
		const user = await database.User.findOne({where: {uuid: uuid}});

		if (user === null) {
			throw new HTTPError(`Could not found the user with id ${uuid}!`, 404);
		}

		// Delete a user with specified id
		const message = await database.User.destroy({
			where: {
				id: uuid,
			},
		});

		// Send response
		res.status(200).json(message);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export {
	getUsers, createUser, updateUser, getUserByUuid, deleteUser
};
