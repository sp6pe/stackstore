// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Category = mongoose.model('Category');
var expect = require('chai').expect;
var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);
var supertest = require('supertest');
var app = require('../../../server/app');
var agent = supertest.agent(app);


describe('Products Route', function () {


	describe('Get with /api/products', function() {
		
		beforeEach('Establish DB connection', function (done) {
			if (mongoose.connection.db) return done();
			mongoose.connect(dbURI, done);
		});

		afterEach('Clear test database', function (done) {
			clearDB(done);
		});

		it ('should find no products', function(done) {
			agent
				.get('/api/products')
				.expect('Content-Type', /json/)
                .expect(200)
                .expect(function (res) {
                   // res.body is the JSON return object
                   expect(res.body).to.be.an.instanceOf(Array);
                   expect(res.body).to.have.length(0);
                })
                .end(done);
		})

		it('returns all products if there are any in the DB', function (done) {

           	var product1 = new Product({
               	title: 'Test product #1',
               	price: 300,
                quantity: 2
           	});

            var product2 = new Product({
                title: 'Test product #2',
                price: 180,
                quantity: 3
            });

           	Promise.all([product1.save(), product2.save()]).then(function () {

               	agent
                   	.get('/api/products')
                   	.expect(200)
                   	.expect(function (res) {
                       	expect(res.body).to.be.an.instanceOf(Array);
                       	expect(res.body[0].title).to.equal('Test product #1');
                        expect(res.body[0].price).to.equal(300);
                       	expect(res.body[0].quantity).to.equal(2);
                        expect(res.body[1].title).to.equal('Test product #2');
                        expect(res.body[1].price).to.equal(180);
                        expect(res.body[1].quantity).to.equal(3);
                       	expect(res.body).to.have.length(2);
                   	})
                   	.end(done);

           	}).then(null, done);

       	});

       	it('returns one product if there is one in the DB', function (done) {

           	var product = new Product({
                title: 'Test product #1',
                price: 300,
                quantity: 2
            });

           	product.save().then(function () {

               	agent
                   	.get('/api/products/' + product._id)
                   	.expect(200)
                   	.expect(function (res) {
                       	expect(res.body.title).to.equal('Test product #1');
                        expect(res.body.price).to.equal(300);
                        expect(res.body.quantity).to.equal(2);
                   	})
                   	.end(done);
           	}).then(null, done);

       	});

       	it('returns error if product is not in the DB', function (done) {

            var product = new Product({
                title: 'Test product #1',
                price: 300,
                quantity: 2
            });

           	product.save().then(function () {
               	agent
                   	.get('/api/products/' + "akvjaelfjaekljvae")
                   	.expect(500)
                   	.end(done);
           	}).then(null, done);
       	});	
	})

	describe('POST /products', function () {

        it('posts a new product', function (done) {
            agent
                .post('/api/products/')
                .send({
                    title: 'Angular Best Interview',
                    price: 1000,
                    quantity: 5
                })
                .expect(201)
                .expect(function (res) {
                    //expect(res.body.message).to.equal('Created successfully');
                    expect(res.body._id).to.not.be.an('undefined');
                    expect(res.body.title).to.equal('Angular Best Interview');
                    expect(res.body.price).to.equal(1000);
                    expect(res.body.quantity).to.equal(5);
                })
                .end(done);
        });

        it('does not create a new product without a body', function (done) {
            agent
                .post('/api/products/')
                .send({
                    description: 'Whatever description'
                })
                .expect(500)
                .end(done);
        });

       it('is able to add a new category', function(done) {
           var product = new Product({
                title: 'Test product #1',
                price: 300,
                quantity: 2
            });

           product.save()
             .then(function(product) {
               agent
                   .post('/api/products/' + product._id + '/category')
                   .send({
                       name: 'Javascript'
                   })
                   .expect(201)
                   .expect(function (res) {
                       //expect(res.body.message).to.equal('Created successfully');
                       expect(res.body.name).to.equal('Javascript');
                   })
                   .end(done);
             });
       });

       it('is able to add an existing category', function(done) {

          var category = new Category({name: 'Javascript'});

          var product = new Product({
               title: 'Test product #1',
               price: 300,
               quantity: 2
           });

          Promise.all([category.save(), product.save()]).then(function () {
            agent
                .post('/api/products/' + product._id + '/category')
                .send({
                    name: 'Javascript'
                })
                .expect(201)
                .expect(function (res) {
                    //expect(res.body.message).to.equal('Created successfully');
                    expect(res.body.name).to.equal('Javascript');
                })
                .end(done);
            });
          });  

    });

  describe('PUT api/products/:id', function () {

          it('updates a product', function (done) {
            //console.log(user._id);
               var product = new Product({
                  title: 'Test product #1',
                  price: 300,
                  quantity: 2
              });

               product.save().then(function(savedProduct) {

                agent
                    .put('/api/products/' + product._id)
                    .send({
                        title: 'Updated Title'
                    })
                    .expect(200)
                    .expect(function (res) {
                        //expect(res.body).to.equal('Updated successfully');
                        expect(res.body._id).to.not.be.an('undefined');
                        expect(res.body.price).to.equal(300);
                        expect(res.body.title).to.equal('Updated Title');
                    })
                    .end(done);

               })

              

          });

         it('gets 500 for invalid update', function (done) {
            var product1 = new Product({
                title: 'Test product #1',
                price: 300,
                quantity: 2
              });

              product1.save();
              agent
                  .put('/api/products/' + product1._id)
                  .send({
                    title: ''
                  })
                  .expect(500)
                  .end(done);
          });

      });

  describe('Delete api/products/:id', function () {



    it('deletes a product', function (done) {
            //console.log(user._id);
            var product = new Product({
              title: 'Test product #1',
              price: 300,
              quantity: 2
            });

            product.save()
              .then(function(savedProduct) {
                agent
                    .delete('/api/products/' + product._id)
                    .expect(204)
                    .end(done);
              });

          });

    });

});
