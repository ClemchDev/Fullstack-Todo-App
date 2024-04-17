const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.signup = (req, res, next) => {
    console.log('test')
    User.findOne({ email: req.body.email })
        .then((oldUser) => {
            if(oldUser) {
                return res.status(409).json({message: 'This email is already used'})
            } else {
                bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        const user = new User({
                            username: req.body.username,
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(() => res.status(201).json({ 
                                    message: 'Utilisateur créé !',
                                    token: jwt.sign(
                                    { userId: user._id },
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '168h'}
                                    // jeton valable 1 semaine
                                    ),                             
                                    email: req.body.email,
                                    username: req.body.username
                                }
                            ))
                            .catch(error => res.status(400).json({ error }));
                        })
                    .catch(error => res.status(500).json({ error }));
            } 
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Email or password incorrect'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Email or password incorrect' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '168h'}
                            // jeton valable 1 semaine
                        ),
                        email: req.body.email,
                        username: req.body.username
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};