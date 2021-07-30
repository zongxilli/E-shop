import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
		});

		// .cyan.underline -> give color in terminal
		console.log(`MongoDB Connected to: ${conn.connection.host}`.magenta);
	} catch (error) {
		// .red.underline -> give color in terminal
		console.error(`Failed to Connect to MongoDB: ${error.message}`.red);
		// Error -> we exit     1 means we gonna exit with failure
		process.exit(1);
	}
};

export default connectDB;
