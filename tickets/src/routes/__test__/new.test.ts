import request from 'supertest';
import { app } from '../../app';

describe('new route', () => {
  it('has a route handler listening to /api/tickets for post requests', async () => {
    const response = await request(app).post('/api/tickets').send({});

    expect(response.status).not.toEqual(404);
  });

  it('can only be accessed if the user is signed in', async () => {
    const response = await request(app).get('/api/tickets/new');
  });

  it('returns an error if an invalid title is provided', async () => {
    const response = await request(app).get('/api/tickets/new');
  });

  it('returns an error if an invalid price is provided', async () => {
    const response = await request(app).get('/api/tickets/new');
  });

  it('creates a ticket with valid inputs', async () => {
    const response = await request(app).get('/api/tickets/new');
  });
});
