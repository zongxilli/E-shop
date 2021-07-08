import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

// To compare if the password is the same as this user's password
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// pre('save) means do this before save
userSchema.pre('save', async function (next) {
	// Check if password has already been modified => we are not going to encrypt it again
	// isModified is a mongoose function
	if (!this.isModified('password')) {
		
		// password is not modified => so let's move on
		next();
	}

	// We want to encrypt the password
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
