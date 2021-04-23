const Post = require('../models').Post
const fs = require('fs');

let postCount = 0;

module.exports = {
	async createPost(req, res) {
			const post = req.body;
			console.log(post);
			try {
					await Post.create({
							userId: post.userId,
							subject: post.subject,
							text: post.text ?? undefined,
							image: undefined,
							post_id: postCount +=1
					})
					
					res.status(201).json({ message: 'Post created!' });
			} catch (error) {
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
			Post.destroy({ where: { id: req.params.id }})
					.then(() => res.status(200).json({ message: 'Post deleted!'}))
					.catch(error => res.status(400).json({ error }));
	//       const filename = post.imageUrl.split('/images/')[1];
	//       fs.unlink(`images/${filename}`, () => {
	}
};