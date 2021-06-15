import { handleHTTPError, HTTPError } from '../../utils';
import database from '../../database';

/*
Get all profiles
*/
const getProfiles = async (req, res, next) => {
	try {
		// Get profiles from database
		let profiles = null;
		profiles = await database.Profile.findAll();

		// Send response
		res.status(200).json(profiles);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific profile id
*/
const getProfileByUserId = async (req, res, next) => {
	try {
		// Get profile id parameter
		const { userId } = req.params;
		// Get specific profile from database
		const profile = await database.Profile.findOne({ where: { userId } });

		if (profile === null) {
			throw new HTTPError(`Could not find the profile from user with id ${userId}!`, 404);
		}
		// Send response
		res.status(200).json(profile);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific profile id
*/
const getProfileById = async (req, res, next) => {
	try {
		// Get profile id parameter
		const { id } = req.params;
		// Get specific profile from database
		const profile = await database.Profile.findByPk({ where: { id } });

		if (profile === null) {
			throw new HTTPError(`Could not find the profile with id ${id}!`, 404);
		}
		// Send response
		res.status(200).json(profile);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Create a new profile
*/
const createProfile = async (req, res, next) => {
	try {
		const { userId } = req.params;
		// Get body from response
		const model = req.body;
		// Get user
		const user = await database.User.findByPk(userId);
		// Create new profile
		const createdModel = await user.createProfile(model);
		// Send response
		res.status(201).json(createdModel);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Update an exisiting profile
*/
const updateProfile = async (req, res, next) => {
	try {
		// Get id parameter
		const { userId } = req.params;
		// Get user
		const user = await database.User.findByPk(userId);
		// Set profile
		const model = req.body;
		await user.setProfile(model);

		// Send response
		res.status(200).json({ message: `Profile from user with id ${userId} has been updated.` });
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Delete an exisiting profile
*/
const deleteprofile = async (req, res, next) => {
	try {
		// Get id parameter
		const { id } = req.params;
		// Get specific profile from database
		const profile = await database.profile.findOne({ where: { id } });

		if (profile === null) {
			throw new HTTPError(`Could not find the profile with id ${id}!`, 404);
		}

		// Delete a profile with specified id
		await database.profile.destroy({
			where: {
				id,
			},
		});

		// Send response
		res.status(200).json({ message: `Profile with id ${id} has been updated.` });
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export {
	getProfiles,
	getProfileById,
	getProfileByUserId,
	createProfile,
	updateProfile,
	deleteprofile,
};
