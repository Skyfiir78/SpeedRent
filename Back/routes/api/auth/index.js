const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../../auth');
const validator = require("email-validator");
const User = mongoose.model('User');

//POST new user route (optional, everyone has access)
router.post('/register', auth.optional, (req, res, next) => {
    const { body: { user } } = req;

    if(!user.email) {
        return res.json({
            errors: {
                email: 'is required',
            },
        });
    }

    if(!user.password) {
        return res.json({
            errors: {
                password: 'is required',
            },
        });
    }

    if (!validator.validate(user.email)) {
        return res.json({
            errors: {
                email: 'email no valid'
            }
        })
    }

    User.find({email: user.email}, function( err, emailResult ){
        if (emailResult.length >= 1) {
            return res.json({
                errors: {
                    message: 'Already used by other user'
                }
            })
        }
        const finalUser = new User(user);

        finalUser.setPassword(user.password);

        return finalUser.save()
        .then(() => res.json({ user: finalUser.toAuthJSON() }));
    })
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
    const { body: { user } } = req;

    if(!user.email) {
        return res.json({
            errors: {
                email: 'is required',
            },
        });
    }

    if(!user.password) {
        return res.json({
            errors: {
                password: 'is required',
            },
        });
    }

    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        if(err) {
            return res.json({
                errors:{
                    message: 'email or password invalid'
                }
            })
        }

        if(passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();

            return res.json({ user: user.toAuthJSON() });
        }

        return status(400).info;
    })(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
    const { payload: { id } } = req;

    return User.findById(id)
    .then((user) => {
        if(!user) {
            return res.sendStatus(400);
        }

        return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;
