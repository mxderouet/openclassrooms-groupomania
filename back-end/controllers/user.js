const User = require('../models').User
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

module.exports = {
    register(req, res) {
        const password = req.body.password;    
        const encryptedPassword = bcrypt.hash(password, saltRounds)
        return User
            .create({
                first_name: req.body.first_name,
                last_name: req.body.last_name, 
                position: req.body.position, 
                email: req.body.email,
                password: encryptedPassword
            })
            .then(user => res.status(201).send(user)).json({ message: 'User created!' })
            .catch(error => res.status(400).send(error));
    },
    login(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        
        if (!email || !password) {
            return res.status(400).send('Request missing username or password param');
        }
        User.findOne({ email: req.body.email })
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
                  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MTY5MjU1NTIsImV4cCI6MTY0ODQ2MTU1MiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.-FdIYL1UuKv4Zd81DgLgQnmzmscHRANX7luGXDl8o80',
                  { expiresIn: '24h' }
                )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
    }
};

