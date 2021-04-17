const userController = require('../controllers').user
const postController = require('../controllers').post

module.exports = (app) => {
    // API health check route
    app.get('/health', (req, res) => res.status(200).send({
        health: true
    }))

    // user's routes
    app.post('/signup', userController.register);

    app.post('/login', userController.login);

	app.delete('/post/delete/:id', userController.deleteUser);

    // post's routes
    app.post('/post/create', postController.createPost);

    app.get('/post/get', postController.getAllPosts);

    app.get('/post/get/:id', postController.getOnePost);

    app.delete('/post/delete/:id', postController.deletePost);
};