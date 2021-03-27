const User = require('../models').User

module.exports = {
    create(req, res) {
        return User
            .create({
                first_name: req.body.first_name,
                last_name: req.body.last_name, 
                position: req.body.position, 
                email: req.body.email,
                password: req.body.password
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
    },
};