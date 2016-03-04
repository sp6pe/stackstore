var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Cart = mongoose.model('Cart');
var Product = mongoose.model('Product');

describe('Cart model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Cart).to.be.a('function');
    });

    describe('addProduct method', function() {

     it('can add one product to cart', function(done) {
        var product = new Product({
             title: 'Test Product',
             price: 500,
             quantity: 1
            });

        product.save()
        .then(function(){
            var cart = new Cart({});
            return cart.save();              
        })
        .then(function(cart){
            return cart.addProduct(product._id);
        })
        .then(function(cartWithProduct) {
            Cart.findById(cartWithProduct._id).populate('productList')
            .then(function(populatedCart){
                expect(populatedCart.productList[0].title).to.equal('Test Product');    
            });
            
            done();
        })
        .then(null, done);
     
     });

    });

    describe('removeProduct method', function() {

     it('can remove one product from cart', function(done) {
        var newCart = new Cart({});
        newCart.save();
        var product = new Product({
             title: 'Product To Be Removed',
             price: 20,
             quantity: 2
            });

        product.save()
        .then(function(product){
            return newCart.addProduct(product._id);
        })
        .then(function(cart){
            return cart.removeProduct(product);
        })
        .then(function(cartRemovedProduct){
            expect(cartRemovedProduct.productList).to.have.lengthOf(0);
            done();
        })
        .then(null,done);
     
     });

    });


});
