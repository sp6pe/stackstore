'use strict';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var CartModel = mongoose.model('Cart');

module.exports = function (app) {

    var googleConfig = app.getValue('env').GOOGLE;

    var googleCredentials = {
        clientID: googleConfig.clientID,
        clientSecret: googleConfig.clientSecret,
        callbackURL: googleConfig.callbackURL
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {

        UserModel.findOne({ 'google.id': profile.id }).exec()
            .then(function (user) {

                if (user) {
                    return user;
                } else {
                    var email = profile.emails[0].value;
                    return UserModel.create({
                        google: {
                            id: profile.id
                        },
                        email: email,
                    });
                }

            }).then(function (userToLogin) {
                done(null, userToLogin);
            }, function (err) {
                console.error('Error creating user from Google authentication', err);
                done(err);
            });

    };

    passport.use(new GoogleStrategy(googleCredentials, verifyCallback));

    app.get('/auth/google', passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));

    // app.get('/auth/google/callback',
    //     passport.authenticate('google', { failureRedirect: '/login' }),
    //     function (req, res) {
    //         var userCart, sessionCart;
    //         CartModel.create({customer: req.user._id})
    //             .then(function(cart) {
    //                 userCart = cart;
    //                 return CartModel.findById(req.session.cart)
    //                 .populate('productList.product customer')
    //                 .deepPopulate('productList.product.interviewer');
    //             })
    //             .then(function(sessionCart) {
    //                 if (sessionCart){
    //                     return userCart.merge(sessionCart);
    //                 }
    //                 req.session.cart = null;
    //             })
    //             .then(function() {
    //                 res.redirect('/');
    //             })
    //             .catch(function(err) {
    //                 console.error(err);
    //             })
    //     });


       app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function (req, res) {
            var userCart;
            CartModel.findOrCreate(req.user._id)
                .then(function(cart){
                    userCart = cart;
                    return CartModel.findById(req.session.cart)
                       .populate('productList.product customer')
                       .deepPopulate('productList.product.interviewer');
                })
                .then(function(sessionCart){
                    if(sessionCart){
                        return userCart.merge(sessionCart);
                    }
                    req.session.cart = null;
                })
                .then(function(){
                    res.redirect('/');
                })
                .catch(function(err){
                    console.error(err);
                })

        });





};
