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


describe('Categories Route', function () {

    describe('/api/categories', function() {
		
        beforeEach('Establish DB connection', function (done) {
        	if (mongoose.connection.db) return done();
        	mongoose.connect(dbURI, done);
        });

        afterEach('Clear test database', function (done) {
        	clearDB(done);
        });


        it('GET all', function (done) {

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

            }).then(null, done);

        });

        it ('GET one by Id', function(done) {
            agent
                .get('/api/categories' + categoryId)
                .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(function (res) {
                        expect(res.body).to.be.an.instanceOf(Array);
                        expect(res.body).to.have.length(0);
                    })
                    .end(done);
        })
        it()

  });
});
