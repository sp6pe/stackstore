// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Category = mongoose.model('Category');
var expect = require('chai').expect;
var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);
var supertest = require('supertest');
var app = require('../../../server/app');
var agent = supertest.agent(app);


describe('Categories Route:', function () {

    describe('GET /api/categories', function() {

        beforeEach('Establish DB connection', function (done) {
            if (mongoose.connection.db) return done();
            mongoose.connect(dbURI, done);
        });

        afterEach('Clear test database', function (done) {
            clearDB(done);
        });

        it('returns an array via JSON', function (done) {

            agent
                .get('/api/categories')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function (res) {
                    // res.body is the JSON return object
                    expect(res.body).to.be.an.instanceOf(Array);
                    expect(res.body).to.have.length(0);
                })
                .end(done);

        });

        it('returns all categories in the DB', function (done) {

            var category1 = new Category({
                name: 'Javascript'
            });

            var category2 = new Category({
                name: 'Angular'
            });

            Promise.all([category1.save(), category2.save()]).then(function () {

                agent
                    .get('/api/categories')
                    .expect(200)
                    .expect(function (res) {
                        expect(res.body).to.be.an.instanceOf(Array);
                        expect(res.body).to.have.length(2);
                        expect(res.body[0].name).to.equal('Javascript');
                        expect(res.body[1].name).to.equal('Angular');
                    })
                    .end(done);

            });
        });
    });

    describe('GET /api/categories/:categoryId', function() {
        
        var category1, category2;

        beforeEach('Establish DB connection', function (done) {
            if (mongoose.connection.db) return done();
            mongoose.connect(dbURI, done);
        });

        beforeEach(function (done) {

            category1 = new Category({
                name: 'Javascript'
            });

            category2 = new Category({
                name: 'Angular'
            });

            Promise.all([category1.save(), category2.save()]).then(function () {
                done();
            }, done);

        });

        afterEach('Clear test database', function (done) {
            clearDB(done);
        });


        it('returns one category based on the ID', function (done) {

            agent
                .get('/api/categories/' + category1._id)
                .expect(200)
                .expect(function (res) {
                    expect(res.body.name).to.equal('Javascript');
                })
                .end(done);

        });

        it('returns a 404 error if the category is not found', function (done) {

            agent
                .get('/api/categories/123fakeID123')
                .expect(404)
                .end(done);

        });
    });

    describe('POST /api/categories', function() {
        
        beforeEach('Establish DB connection', function (done) {
            if (mongoose.connection.db) return done();
            mongoose.connect(dbURI, done);
        });

        afterEach('Clear test database', function (done) {
            clearDB(done);
        });

        it('adds a new category to the DB', function (done) {

            agent
                .post('/api/categories')
                .send({
                    name:"PhantomJS"
                })
                .expect(201)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body.name).to.equal('PhantomJS');
                    done();
                });

        });
    });

    describe('PUT /api/categories/:categoryId', function() {

        var category1, category2;

        beforeEach('Establish DB connection', function (done) {
            if (mongoose.connection.db) return done();
            mongoose.connect(dbURI, done);
        });

        beforeEach(function (done) {

            category1 = new Category({
                name: 'Javascript'
            });
            category2 = new Category({
                name: 'Angular'
            });

            Promise.all([category1.save(), category2.save()]).then(function () {
                done();
            }, done);

        });

        afterEach('Clear test database', function (done) {
            clearDB(done);
        });

        it('Updates the name of one category by ID', function (done) {
            
            agent
                .put('/api/categories/' + category1._id)
                .send({
                    name: 'New Category Title'
                })
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body.name).to.equal('New Category Title');
                    done();
                });

        });

        it('Doesn\'t update one category that doesn\'t exist', function (done) {
            
            agent
                .put('/api/categories/' + '123fakeID')
                .send({name: 'Bad ID Category Title'})
                .expect(404)
                .end(done);

        });
    });


    describe('DELETE /api/categories/:categoryId', function() {
        
        var category1, category2;

        beforeEach('Establish DB connection', function (done) {
            if (mongoose.connection.db) return done();
            mongoose.connect(dbURI, done);
        });

        beforeEach(function (done) {

            category1 = new Category({
                name: 'Javascript'
            });

            category2 = new Category({
                name: 'Angular'
            });

            Promise.all([category1.save(), category2.save()]).then(function () {
                done();
            }, done);

        });

        afterEach('Clear test database', function (done) {
            clearDB(done);
        }); 

        it('Deletes one category from DB', function (done) {
            
            agent
                .delete('/api/categories/' + category1._id)
                .expect(204)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body.name).to.be.an('undefined');
                    done();
                });

        });

        it('Doesn\'t delete one category that doesn\'t exist', function (done) {
            
            agent
                .delete('/api/categories/123fakeId')
                .expect(404)
                .end(done);

        });
    });
});
