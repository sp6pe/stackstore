'use strict';
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports = function (app) {

    var facebookConfig = app.getValue('env').FACEBOOK;

    var facebookCredentials = {
        clientID: facebookConfig.clientID,
        clientSecret: facebookConfig.clientSecret,
        callbackURL: facebookConfig.callbackURL
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {

        UserModel.findOne({ 'facebook.id': profile.id }).exec()
            .then(function (user) {

                if (user) {
                    return user;
                } else {
                    return UserModel.create({
                        facebook: {
                            id: profile.id
                        }
                    });
                }

            }).then(function (userToLogin) {
                done(null, userToLogin);
            }, function (err) {
                console.error('Error creating user from Facebook authentication', err);
                done(err);
            })

    };

    passport.use(new FacebookStrategy(facebookCredentials, verifyCallback));

    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function (req, res) {
            var userCart, sessionCart;
            CartModel.create({customer: req.user._id})
                .then(function(cart) {
                    userCart = cart;
                    return CartModel.findById(req.session.cart)
                    .populate('productList.product customer')
                    .deepPopulate('productList.product.interviewer');
                })
                .then(function(sessionCart) {
                    if (sessionCart){
                        return userCart.merge(sessionCart);
                    }
                    req.session.cart = null;
                })
                .then(function() {
                    res.redirect('/');
                })
                .catch(function(err) {
                    console.error(err);
                })
        });

};
