const Post = require("../models").Post;
const fs = require("fs");

let postCount = 0;

module.exports = {
  async createPost(req, res) {
    const post = req.body;
    try {
      const postCount = Object.keys(await Post.findAll()).length;
      await Post.create({
        userId: req.userId,
        subject: post.subject,
        text: post.text ?? undefined,
        image: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
        post_id: postCount ?? 1,
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
  getOnePost(req, res) {
    Post.findOne({ where: { id: req.params.id } })
      .then((posts) => res.status(200).json(posts))
      .catch((error) => res.status(400).json({ error }));
  },
  deletePost(req, res) {
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
  },
  async editPost(req, res) {
    const post = req.body;
    const postEdited = {
      userId: req.userId,
      subject: post.subject,
      text: post.text ?? undefined,
      image: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`
    };
    try {
      await Post.update(postEdited, { where: { id: req.params.id }})
      res.status(200).json({ message: "Object modified!" })
    } catch(error) {
      res.status(400).json({ error });
    }
  },
};
