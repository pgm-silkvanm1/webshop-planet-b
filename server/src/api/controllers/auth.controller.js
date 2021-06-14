import { handleHTTPError } from '../../utils';
import database from '../../database';

const register = async (req, res, next) => {
	try {
		// Get new user credentials from body of request
		const user = req.body;

        // Check if user already exists and respond accordingly
        const userExists = await database.User.findOne({ where: { email: user.email } });
        if (userExists) return res.json({ message: `User with email ${user.email} already exists` });

        // Create a new user in the database with login credentials
        const newUser = await database.User.create(user);
        res.status(200).json({ message: `User with email ${newUser.email} has been registered.` });
    } catch (error) {
        handleHTTPError(error, next);
	}
};

const login = async (req, res, next) => {
    try {
        // Get user login credentials from body of request
        const user = req.body;

        // Check if user exists
        const userExists = await database.User.findOne({ where: { email: user.email } });
        if (!userExists) return res.json({ message: 'Email or password does not match!' });
        // Check if user password matches existing user
        if (userExists.password !== user.password) return res.json({ message: 'Email or password does not match!' });



        res.status(200).json();
    } catch (error) {
        handleHTTPError(error, next);
    }
};

export {
    login,
    register,
};
