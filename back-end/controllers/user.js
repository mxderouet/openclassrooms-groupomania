const User = require('../models').User
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

module.exports = {
	async register(req, res) {
			const password = req.body.password;    
			const encryptedPassword = await bcrypt.hash(password, saltRounds)
			try {
				await User.create({
					first_name: req.body.first_name,
					last_name: req.body.last_name, 
					position: req.body.position, 
					email: req.body.email,
					password: encryptedPassword
				})
				res.status(201).json({ message: 'User created!' });
			} catch (error) {
				res.status(400).send(error);
			}
	},
	login(req, res) {
			const email = req.body.email;
			const password = req.body.password;
			console.log(req.body);
			if (!email || !password) {
					return res.status(400).send('Request missing username or password param');
			}
			User.findOne({where: { email: req.body.email }})
		.then(user => {
			if (!user) {
				return res.status(401).json({ error: 'User not found!' });
			}
			bcrypt.compare(req.body.password, user.password)
				.then(valid => {
					if (!valid) {
						return res.status(401).json({ error: 'Wrong credentials!' });
					}
					res.status(200).json({
							userId: user._id,
							token: jwt.sign(
								{ userId: user._id },
								process.env.TOKEN,
								{ expiresIn: '24h' }
							)
					});
				})
				.catch(error => res.status(500).json({ error }));
		})
		.catch(error => res.status(500).json({ error }));
	},
	deleteUser(req, res) {
		User.destroy({ where: { id: req.params.id }})
		.then(() => res.status(200).json({ message: 'User deleted!'}))
		.catch(error => res.status(400).json({ error }));
	}
};

