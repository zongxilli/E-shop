import bcrypt from 'bcryptjs';

const users = [
	{
		name: 'Admin User',
		email: 'zongxi2014@gmail.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'Kennie',
		email: '676773089@qq.com',
		password: bcrypt.hashSync('123456', 10),
	},
	{
		name: 'Doubing',
		email: 'zongxi.li@mail.utoronto.ca',
		password: bcrypt.hashSync('123456', 10),
	},
];

export default users;
