const Post = require('../models').Post
const fs = require('fs');

let postCount = 0;

module.exports = {
	async createPost(req, res) {
		const post = req.body;
		try {
				await Post.create({
					userId: req.userId,
					subject: post.subject,
					text: post.text ?? undefined,
					image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
					post_id: postCount +=1
				})
				
				res.status(201).json({ message: 'Post created!' });
		} catch (error) {
				console.log(error.message);
				res.status(400).send(error);
		}
	},
	getAllPosts(req, res) {
		Post.findAll()
				.then(posts => res.status(200).json(posts))
				.catch(error => res.status(400).json({ error }));
	},
	getOnePost(req, res) {
		Post.findOne({ where: { id: req.params.id }})
				.then(posts => res.status(200).json(posts))
				.catch(error => res.status(400).json({ error }));
	},
	deletePost(req, res) {
		Post.findOne({ where: { id: req.params.id }})
			.then(post => {
			const filename = post.imageUrl.split('/images/')[1];
	      	fs.unlink(`images/${filename}`, () => {
				Post.destroy({ where: { id: req.params.id }})
				.then(() => res.status(200).json({ message: 'Post deleted!'}))
					.catch(error => res.status(400).json({ error }));
			});
		})
		.catch(error => res.stats(400).json({ error }));
	},
	editPost(req, res) {
		const postObject = req.file ?
		{
		  ...JSON.parse(req.body.post),
		  imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
		} : { ...req.body };
	  Post.save({ _id: req.params.id }, { ...postObject, _id: req.params.id })
		.then(() => res.status(200).json({ message: 'Object modified!'}))
		.catch(error => res.status(400).json({ error }));
	}
};