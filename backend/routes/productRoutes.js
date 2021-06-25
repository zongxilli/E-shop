import express from 'express';
import expressAsyncHandler from 'express-async-handler';
const router = express.Router();
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get(
	'/',
	expressAsyncHandler(async (req, res) => {
		const products = await Product.find({});

		res.json(products);
	})
);

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get(
	'/:id',
	expressAsyncHandler(async (req, res) => {
		const product = await Product.findById(req.params.id);

		// If we found product <=> product !== null
		if (product) {
			// give back a json format response
			res.json(product);

			// product is null <=> failed to get response
		} else {
			// 500 error by default
			// We set it to 404
			res.status(404);
			throw new Error('Product not found');
		}
	})
);

export default router;
