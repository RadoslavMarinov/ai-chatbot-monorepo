import request from 'supertest';
import server from './index';

afterAll((done) => {
  server.close(done);
});

describe('GET /', () => {
  it('should return Hello World!', async () => {
    const res = await request(server).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Hello World!');
  });
});
