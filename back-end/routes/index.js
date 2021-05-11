const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const userController = require('../controllers').user;
const postController = require('../controllers').post;

module.exports = (app) => {
    // API health check route
    app.get('/health', (req, res) => res.status(200).send({
        health: true
    }))

    // user's routes
    app.post('/signup', userController.register);

    app.post('/login', userController.login);

    app.delete('/user/delete/:id', auth, userController.deleteUser);

    app.get('/user/infos', auth, userController.userInfos)

    // post's routes
    app.post('/post/create', auth, multer, postController.createPost);

    app.get('/post/get', auth, postController.getAllPosts);

    app.get('/post/get/:id', auth, postController.getOnePost);

    app.delete('/post/delete/:id', auth, postController.deletePost);

    app.put('/post/edit/:id', auth, multer, postController.editPost);
};