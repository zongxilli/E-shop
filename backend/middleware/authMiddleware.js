import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = expressAsyncHandler(async (req, res, next) => {
	let token;

	// If the request's header exist & request's header is start with 'Bearer'
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		// Try to decode the token
		try {
			// Split the request with ' ' and the actual token is at 2nd index
			token = req.headers.authorization.split(' ')[1];

			// Decoded it it will looks like
			// { id: '60d2c304ad43d793e0f27a16', iat: 1624904450, exp: 1627496450 }
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.user = await User.findById(decoded.id).select('-password');

			console.log(decoded);

			next();
		} catch (error) {
			console.error(error);
			res.status(401);
			throw new Error('Not authorized, token failed');
		}
	}

	// If no token
	if (!token) {
		res.status(401);
		throw new Error('Not authorized, no token');
	}
});

const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(401);
		throw new Error('Not authorized as an admin');
	}
};

export { protect, admin };
