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
		const { id } = req.params;
		// Get specific profile from database
		const profile = await database.Profile.findOne({where: {id: id}});

		if (profile === null) {
			throw new HTTPError(`Could not found the profile with id ${id}!`, 404);
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
		// Get body from response
		const model = req.body;
		// Create a post
		const createdModel = await database.Profile.create(model);
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
		const { id } = req.params;
		console.log(id);
		// Get specific profile from database
		const profile = await database.Profile.findOne({where: { id: id }});

		if (profile === null) {
			throw new HTTPError(`Could not found the profile with id ${id}!`, 404);
		}

		// Update a specific profile
		const model = req.body;
		const updatedProfile = await database.Profile.update(model, {
			where: {
				id: id,
			},
		});

		// Send response
		res.status(200).json(updatedProfile);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Delete an exisiting profile
*/
const deleteProfile = async (req, res, next) => {
	try {
		// Get id parameter
		const { id } = req.params;
		// Get specific profile from database
		const profile = await database.Profile.findOne({where: {id: id}});

		if (profile === null) {
			throw new HTTPError(`Could not found the profile with id ${id}!`, 404);
		}

		// Delete a profile with specified id
		const message = await database.Profile.destroy({
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
