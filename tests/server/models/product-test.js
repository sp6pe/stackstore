var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Product = mongoose.model('Product');
var User = mongoose.model('User');
var Category = mongoose.model('Category');

describe('Product', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Product).to.be.a('function');
    });

    describe('model', function() {
      var user;

      before(function (done) {
        User.create({
          email: 'user@email.com',
          password: 'testPassword'
        }, function (err, u) {
          if (err) return done(err);
          user = u;
          done();
        });
      });

      it('is created and has title, price, an quantity', function(done) {
        var product = new Product({
          title: 'Javascript Interview',
          price: 150,
          quantity: 1
        });

        product.save().then(function(savedProduct) {
          expect(savedProduct.title).to.equal('Javascript Interview');
          expect(savedProduct.price).to.equal(150);
          expect(savedProduct.quantity).to.equal(1);
          done();
        })
        .then(null, done);
      });

      it('can find by category ID', function(done) {
        var category = new Category({
          name: 'Javascript'
        });

        category.save()
          .then(function(savedCategory) {
            var product = new Product({
              title: 'Test title',
              price: 150,
              quantity: 1,
              categories: [savedCategory._id]
            });

            return product.save();
            
          })
          .then(function(savedProduct) {
            return Product.findByCategoryId(savedProduct.categories[0]);
          })
          .then(function(productWithCat) {
            expect(productWithCat[0].categories[0].name).to.equal('Javascript');
            done();
          })
          .then(null, done);
      });

      it('can find by user id', function(done){
        var product = new Product({
              title: 'Another Test title',
              price: 120,
              quantity: 2,
              user: user._id
            });

        product.save()
        .then(function(savedProduct){
          return Product.findByUserId(user._id);
        })
        .then(function(productWithUser){
          expect(productWithUser[0].title).to.equal('Another Test title');
          done();
        })
        .then(null,done);
      });



    });

});
