import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
		});

		// .cyan.underline -> give color in terminal
		console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
	} catch (error) {
		// .red.underline -> give color in terminal
		console.error(`出Error了: ${error.message}`.red.underline.bold);
		// Error -> we exit     1 means we gonna exit with failure
		process.exit(1);
	}
};

export default connectDB;
