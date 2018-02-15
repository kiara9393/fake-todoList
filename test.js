var assert = require('assert');
var request = require('supertest');
var app = require('./app');


describe('API Creator', function () {
  it('return all list', function (done) {
    request(app)
      .get('/creator/todoList?token=Creator')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('insert work with token', function (done) {
    request(app)
      .post('/creator/addTodo?token=Creator')
      .set('Accept', 'application/json')
      .send({ idCreator: 1, idAssigne: 2, action: "Wash the car" })
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('insert work with idCreator=idAssigne', function (done) {
    request(app)
      .post('/creator/addTodo?token=Creator')
      .set('Accept', 'application/json')
      .send({ idCreator: 1, idAssigne: 1, action: "work" })
      .expect(400)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('delete correct', function (done) {
    request(app)
      .delete('/creator/del/1?token=Creator')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('delete wrong', function (done) {
    request(app)
      .delete('/creator/del/45?token=Creator')
      .set('Accept', 'application/json')
      .expect(404)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('set false correct', function (done) {
    request(app)
      .get('/creator/actionNotComplete/2?token=Creator')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('set false wrong', function (done) {
    request(app)
      .get('/creator/actionNotComplete/5?token=Creator')
      .set('Accept', 'application/json')
      .expect(404)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('add users correct', function (done) {
    request(app)
      .post('/creator/addUser?token=Creator')
      .send({ id: 4, name: "Chiara" })
      .set('Accept', 'application/json')
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('add users wrong', function (done) {
    request(app)
      .post('/creator/addUser?token=Creator')
      .send({ id: 1, name: "Paola" })
      .send({ id: 1, name: "Paola" })
      .set('Accept', 'application/json')
      .expect(400)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe('API Assignee', function () {
  it('set true correct', function (done) {
    request(app)
      .get('/ansigne/actionComplete/4?token=Caio')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('set true wrong', function (done) {
    request(app)
      .get('/ansigne/actionComplete/45?token=Pippo')
      .set('Accept', 'application/json')
      .expect(404)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});

