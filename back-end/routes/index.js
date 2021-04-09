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

    // post's routes
    app.post('/post/create', postController.createPost);

    app.get('/post/get', postController.getAllPosts);

    app.delete('/post/delete', postController.deletePost);
};