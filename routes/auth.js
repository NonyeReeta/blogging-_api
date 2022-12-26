const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const authRouter = express.Router();

const userModel = require('../models/users')


authRouter.post(
    '/signup',
    passport.authenticate('signup', { session: false }), async (req, res, next) => {
        console.log(req.body)
        // res.json({
        //     message: 'Signup successful',
        //     user: req.user
        // });
        const user = { _id: req.user._id, email: req.user.email };
        let token = jwt.sign({ user: user }, process.env.JWT_SECRET, {expiresIn: '3600s'});
        return res.json({ token :token})

    }
);

authRouter.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate('login', async (err, user, info) => {
            try {
                // console.log(info)
                if(user){
                req.login(user, { session: false },
                    async (error) => {
                        if (error) return next(error);
                            const body = { _id: user._id, email: user.email };
                            //You store the id and email in the payload of the JWT. 
                            // You then sign the token with a secret or key (JWT_SECRET), and send back the token to the user.
                            // DO NOT STORE PASSWORDS IN THE JWT!
                            let token = jwt.sign({ user: body }, process.env.JWT_SECRET, {expiresIn: '3600s'});
                            return next(res.json({ token }));              
                    }
                )}
                if (err) {
                    return next(err);
                }
                if (!user) {
                    // const error = new Error('Username or password is incorrect');
                    return next(res.json({ error: 'Username or password is incorrect'}));
                }

               
            } catch (error) {
                return next(error);
            }
        }
        )(req, res, next);
    }
);

module.exports = authRouter;