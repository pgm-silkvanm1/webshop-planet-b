import passport from 'passport';
import passportJWT from 'passport-jwt';
import 'dotenv/config';

const JwtStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET_KEY,
};

passport.use(
	new JwtStrategy(options, async (jwtData, done) => {
		try {
			return done(null, jwtData);
		} catch (error) {
			done(null, error);
		}
	}),
);

const userAuth = (req, res, next) => {
	passport.authenticate('jwt', {
		session: false,
	}, (error, user, info) => {
		if (error || !user) {
			res.status(401).send(info);
		} else {
			next();
		}
	})(req, res, next);
};

const adminAuth = (req, res, next) => {
	passport.authenticate('jwt', {
		session: false,
	}, (error, user) => {
		if (error || !user || !!user.admin === false) {
			res.status(401).send(`Error: User ${user.email} is not authorized to make this request`);
		} else {
			next();
		}
	})(req, res, next);
};

const viewAuth = (req, res, next) => {
	passport.authenticate('jwt', {
		session: false,
	}, (error, user) => {
		if (error
            || !user
            || (req.params.userId && req.params.userId !== user.id && user.is_admin !== 1)
            || (req.params.username && req.params.username !== user.username && user.is_admin !== 1)
		) {
			res.status(401).send(`Error: User ${user.username} is not authorized to make this request.`);
		}
		next();
	})(req, res, next);
};

export {
	userAuth,
	adminAuth,
	viewAuth,
};
