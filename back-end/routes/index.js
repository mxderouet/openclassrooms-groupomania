const userController = require('../controllers').user

module.exports = (app) => {
    app.get('/api/health', (req, res) => res.status(200).send({
        health: true
    }))

    app.post('/api/signup', userController.register);

    app.post('api/login', userController.login);
};