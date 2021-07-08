// We putted "type": "module" in package.json to be able to use ES15 syntax
// And also use node version later than 12
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

//! Remember to keep .js at the end

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { requestAddress } from './middleware/consoleLogMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectDB();

const app = express();

//`Middleware(Console Log) ->
// console log out the Address any time we made a request
app.use(requestAddress);

// This allow us to accept JSON data in the body
app.use(express.json());

app.get('/', (req, res) => {
	res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

//`Middleware(Error) ->
// throw the error message
app.use(notFound);
//` Middleware(Error Handler) ->
// format all of the error message
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(
		`Server Running In < ${process.env.NODE_ENV} mode > On Port: ${PORT}`.cyan
			.underline
	)
);

//! Run both frontend & backend command: npm run dev
