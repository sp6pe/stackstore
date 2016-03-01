var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Product = mongoose.model('Product');
var User = mongoose.model('User');

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

      it('requires title', function(done) {
        var product = new Product({
          price: 150,
          quantity: 1
        });

        product.validate(function(err) {
          expect(err).to.be.an('object');
          expect(err.message).to.equal('Product validation failed');
          done();
        });
      });

      it('requires price', function(done) {
        var product = new Product({
          title: 'Test title',
          quantity: 1
        });

        product.validate(function(err) {
          expect(err).to.be.an('object');
          expect(err.message).to.equal('Product validation failed');
          done();
        });
      });

      it('requires quantity', function(done) {
        var product = new Product({
          title: 'Test title',
          price: 150
        });

        product.validate(function(err) {
          expect(err).to.be.an('object');
          expect(err.message).to.equal('Product validation failed');
          done();
        });
      });

      it('only chooses from available categories', function(done) {
        var product = new Product({
          title: 'Test title',
          price: 150,
          quantity: 1,
          category: 'dog'
        });

        product.validate(function(err) {
          expect(err).to.be.an('object');
          expect(err.message).to.equal('Product validation failed');
          done();
        });
      });

      describe('Reviews', function() {
        it('contains a review', function(done) {
          var product = new Product({
            title: 'Test title',
            price: 150,
            quantity: 1,
            reviews: [{
              review: 'This is a test review with min length 20',
              stars: 5
            }]
          });

          product.save().then(function(savedProduct) {
            expect(savedProduct.reviews[0].review).to.equal('This is a test review with min length 20');
            expect(savedProduct.reviews[0].stars).to.equal(5);
            done();
          })
          .then(null, done);
          
        });

        it('requires reviews to have minlength of 20 characters', function(done) {
          var product = new Product({
            title: 'Test title',
            price: 150,
            quantity: 1,
            reviews: [{
              review: 'Short review',
              stars: 5
            }]
          });

          product.validate(function(err) {
            expect(err).to.be.an('object');
            expect(err.message).to.equal('Product validation failed');
            done();
          });
        });

        it('requires reviews to have 1 to 5 stars', function(done) {
          var product = new Product({
            title: 'Test title',
            price: 150,
            quantity: 1,
            reviews: [{
              review: 'This is a test review with min length 20',
              stars: 8
            }]
          });

          product.validate(function(err) {
            expect(err).to.be.an('object');
            expect(err.message).to.equal('Product validation failed');
            done();
          });
        });



      });





    })

});
