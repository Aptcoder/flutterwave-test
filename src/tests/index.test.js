const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('Testing', () => {
  it('Should say hello', async () => {
    const res = await request(app).get('/');
    expect(res.body.message).to.eql('hello');
  });
});
