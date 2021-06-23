// We putted "type": "module" in package.json to be able to use ES15 syntax
// And also use node version later than 12
import  express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
// Remember to keep .js at the end
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';



dotenv.config();

connectDB();

const app = express();

app.get('/', (req, res) => {
	res.send('API is running...');
});

app.use('/api/products', productRoutes)

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(
		`Server Running In < ${process.env.NODE_ENV} mode > On Port: ${PORT}`.cyan.underline
	)
);


// Run both frontend & backend command: npm run dev