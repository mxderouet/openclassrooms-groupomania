const Post = require("../models").Post;
const User = require("../models").User;
const fs = require("fs");
const jwt = require('jsonwebtoken');

module.exports = {
  async createPost(req, res) {
    const post = req.body;
    try {
      await Post.create({
        userId: req.userId,
        subject: post.subject,
        text: post.text || undefined,
        image: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
        post_id: post.post_id
      });

      res.status(201).json({ message: "Post created!" });
    } catch (error) {
      console.log(error.message);
      res.status(400).send(error);
    }
  },
  getAllPosts(req, res) {
    Post.findAll()
      .then((posts) => res.status(200).json(posts))
      .catch((error) => response.status(400).json({ error }));
  },
  async getOnePost(req, res) {
    try {
    const comments = await Post.findAll({ where: { post_id: req.params.id }, include: [ { model: User, as: "User"} ] });
    const post = await Post.findOne({ where: { id: req.params.id }, include: [ { model: User, as: User } ] });
    const allUsers = await User.findAll()
    const user = await User.findOne({ where: { id: post.userId }});
    const userFirstName = user === null ? 'deleted user ' : user.first_name;
      return res.status(200).json({ post, comments, allUsers, userName: userFirstName });
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ error });
    }
  },
  async deletePost(req, res) {
    // check for admin rights or userId 
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    const user = await User.findOne({where: { id: req.token.userId }})
    if (userId === user.id || user.isAdmin === 1) {
      Post.findOne({ where: { id: req.params.id } })
        .then((post) => {
          if (post.imageUrl) {
            const filename = post.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`);
          }
          Post.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: "Post deleted!" }))
            .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(400).json({ error }));
    } else {
      res.status(401).json("Unauthorized");
    }
  },
  async editPost(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    // we check that the Token is the same with the secret key
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    const user = await User.findOne({where: { id: req.token.userId }})
    const post = req.body;
    const postEdited = {
      userId: req.userId,
      subject: post.subject,
      text: post.text || undefined,
      image: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`
    };
    // check for admin rights or userId 
    if (userId === user.id || user.isAdmin === 1) {
      try {
        await Post.update(postEdited, { where: { id: req.params.id }})
        res.status(200).json({ message: "Object modified!" })
      } catch(error) {
        res.status(400).json({ error });
      }
    } else {
      res.status(401).json("Unauthorized");
    }
  },
};
