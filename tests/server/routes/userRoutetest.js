// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');
var expect = require('chai').expect;
var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);
var supertest = require('supertest');
var app = require('../../../server/app');
var agent = supertest.agent(app);


describe('Users Route', function () {


	describe('Get with /api/users', function() {
		
		beforeEach('Establish DB connection', function (done) {
			if (mongoose.connection.db) return done();
			mongoose.connect(dbURI, done);
		});

		afterEach('Clear test database', function (done) {
			clearDB(done);
		});


		it ('should find no users', function(done) {
			agent
				.get('/api/users')
				.expect('Content-Type', /json/)
                .expect(200)
                .expect(function (res) {
                   // res.body is the JSON return object
                   expect(res.body).to.be.an.instanceOf(Array);
                   expect(res.body).to.have.length(0);
                })
                .end(done);
		})

		it('returns an article if there is one in the DB', function (done) {

           	var user = new User({
               	email: '1@1.1',
               	password: 'test'
           	});

           	user.save().then(function () {

               	agent
                   	.get('/api/users')
                   	.expect(200)
                   	.expect(function (res) {
                       	expect(res.body).to.be.an.instanceOf(Array);
                       	expect(res.body[0].password).to.equal('test');
                       	expect(res.body[0].email).to.equal('1@1.1');
                       	expect(res.body).to.have.length(1);

                   	})
                   	.end(done);

           	}).then(null, done);

       	});

       	it('returns a user if there is one in the DB', function (done) {

           	var user = new User({
               	email: 'test@test.test',
               	password: 'jai'
           	});

           	user.save().then(function () {

               	agent
                   	.get('/api/users/' + user._id)
                   	.expect(200)
                   	.expect(function (res) {
                       	expect(res.body.password).to.equal('jai');

                       	// expect(res.body).to.be.an.instanceOf(Array);
                       	// expect(res.body[0].email).to.equal('1@1.1');
                       	// expect(res.body).to.have.length(1);

                   	})
                   	.end(done);

           	}).then(null, done);

       	});

       	it('returns errro if user is not in the DB', function (done) {

           	var user = new User({
               	email: 'test@test.test',
               	password: 'jai'
           	});

           	user.save().then(function () {

               	agent
                   	.get('/api/users/' + "akvjaelfjaekljvae")
                   	.expect(500)
                   	.end(done);

           	}).then(null, done);

       	});
		
	})

	describe('POST /users', function () {

        /**
         * Test the creation of an article
         * Here we don't get back just the article, we get back a Object
         * of this type:
         *
         * {
     *   message: 'Created successfully'
     *   article: {
     *     _id: ...
     *     title: ...
     *   }
     * }
         */
        it('posts a new user', function (done) {
            agent
                .post('/api/users/')
                .send({
                    email: 'Jai@123.com',
                    password: '1234'
                })
                .expect(201)
                .expect(function (res) {
                    //expect(res.body.message).to.equal('Created successfully');
                    expect(res.body._id).to.not.be.an('undefined');
                    expect(res.body.email).to.equal('Jai@123.com');
                })
                .end(done);
        });

        // This one should fail with a 500 because we don't set the article.body
        it('does not create a new user without a body', function (done) {
            agent
                .post('/api/users/')
                .send({
                    email: 'This Article Should Not Be Allowed'
                })
                .expect(500)
                .end(done);
        });

        // Check if the articles were actually saved to the database
        xit('saves the user to the DB', function (done) {
        		User.find({})
        		.then(function(data) {
        			console.log(data);
        		})
        		.then(null,done);

        });

    });

});
