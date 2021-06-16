import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import database from '../../database';
import { handleHTTPError, HTTPError } from '../../utils';

const isValidPassword = async (user, password) => {
	const match = await bcrypt.compare(password, user.password);
	return match;
};

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const user = await database.User.findOne({ where: { email } });

		if (!user) throw new HTTPError('Email or password does not match!', 400);
		if (!isValidPassword(user, password)) throw new HTTPError('Email or password does not match!', 400);
		console.log(user.email);
		const jwtToken = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: parseInt(process.env.JWT_LIFETIME, 10) });

		res.status(200).json({
			message: 'Succesfully logged in.',
			token: jwtToken,
			userId: user.id,
			email: user.email,
			admin: user.admin,
		});
	} catch (error) {
		handleHTTPError(error, next);
	}
};

const register = async (req, res, next) => {
	try {
		const { email, password, admin } = req.body;

		const userExists = await database.User.findOne({ where: { email } });

		if (userExists) throw new HTTPError({ message: 'User with thah email already exists.' });

		const newUser = { email, password, admin };
		const addedUser = await database.User.create(newUser);
		if (addedUser) res.status(200).json({ message: 'New user had been registered.' });
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export {
	login,
	register,
};
