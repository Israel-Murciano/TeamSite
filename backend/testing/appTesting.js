var request = require('supertest');
var app = require('./server.js');

#emilylovepizzaloveeeeeEe
describe('Get /apps',function() {
    it('respong with json',function(done) {
        // navigate to /apps and get json format
        request(app).get('/apps').expect
    })
}) 
