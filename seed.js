/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');


var Product = Promise.promisifyAll(mongoose.model('Product'));
var Review = Promise.promisifyAll(mongoose.model('Review'));
var User = Promise.promisifyAll(mongoose.model('User'));
var Cart = Promise.promisifyAll(mongoose.model('Cart'));
var Category = Promise.promisifyAll(mongoose.model('Category'));

var seedCategories = function(){
    var categories = [
        {
            name: 'Javascript'
        },
        {
            name: 'Ruby'
        },
        {
            name: 'Java'
        }
    ];

    return Category.createAsync(categories);

}


var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password',
            firstName: 'Joe',
            lastName: 'Alvez',
            photoUrl: 'http://s3.amazonaws.com/fullstackwebsite/joe_alves.jpg'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus',
            firstName: 'Joe',
            lastName: 'Alvez',
            photoUrl: 'http://s3.amazonaws.com/fullstackwebsite/joe_alves.jpg'
        }
    ];

    return User.createAsync(users);

};


var seedProducts = function (users) {
    var products = [
        {
            title: 'Test Course 1',
            price: 100,
            quantity: 10,
            interviewer: users[0]._id
        },
        {
            title: 'Test Course 2',
            price: 80,
            quantity: 8,
            interviewer: users[1]._id
        },
        {
            title: 'Test Course 3',
            price: 180,
            quantity: 5
        },
        {
            title: 'Test Course 4',
            price: 100,
            quantity: 10
        },
        {
            title: 'Test Course 5',
            price: 80,
            quantity: 8
        },
        {
            title: 'Test Course 5',
            price: 180,
            quantity: 5
        },
        {
            title: 'Test Course 6',
            price: 180,
            quantity: 5
        },
        {
            title: 'Test Course 7',
            price: 100,
            quantity: 10
        },
        {
            title: 'Test Course 8',
            price: 80,
            quantity: 8
        },
        {
            title: 'Test Course 8',
            price: 180,
            quantity: 5
        },
        {
            title: 'Test Course 9',
            price: 180,
            quantity: 5
        }
    ];

    return Product.createAsync(products);

};

var seedCart = function (products, users) {

    var carts = [
        {
            status: 'created',
            productList: [
                {
                    product: products[0]._id,
                    quantity: 5
                },
                {
                    product: products[1]._id,
                    quantity: 3
                }
            ],
            customer: users[0]._id
        },
        {
            status: 'complete',
            productList: [
                {
                    product: products[0]._id,
                    quantity: 5
                },
                {
                    product: products[1]._id,
                    quantity: 3
                }
            ],
            customer: users[0]._id
        },
  
    ];

    return Cart.createAsync(carts);

};

var seedReviews = function (products) {

    var reviews = [
    {
        title: 'The material is good.',
        content: 'The material is good. Would be 5 stars if it was proofed better. I came from only having an introductory course in Angular and LOVE this course.',
        stars: 5,
        product: products
    },
    {
        title: 'Teaches AngularJS using an easy to understand layered approach',
        content: 'He starts with the basics and has you create a primitive diving log application and then has you progressively improving the application while connecting that back to important concepts.',
        stars: 4,
        product: products
    },
    {
        title: 'Exceeds expectations!!',
        content: 'Price is incredibly good, and I\'m sure you can learn something',
        stars: 5,
        product: products
    },
    {
        title: 'Interview questions can be easily found online',
        content: 'It\'s not a bad practice Angular interview skills. Have a look at online resources before spending the money',
        stars: 3,
        product: products
    }
    ];

    return Review.createAsync(reviews);

};


connectToDb.then(function(){
        return seedCategories()
    })
    .then(function(){
        console.log("succesfully seeded Categories")
    })
    .catch(function(err){
        console.log(err);
    })


// var savedUsers;
// connectToDb.then(function () {      
//     // return seedUsers();
   
//     return seedUsers();
// })
// .then(function(users) {
//     savedUsers = users;
//     return seedProducts(users);
// })
// .then(function(products) {
//     return seedCart(products, savedUsers);
// })
// .catch(function (err) {
//     console.error(err);
// });
