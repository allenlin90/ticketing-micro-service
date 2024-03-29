import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

describe('show route', () => {
  it('returns a 404 if the ticket is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    return request(app).get(`/api/tickets/${id}`).send().expect(404);
  });

  it('returns a valid ticket from db', async () => {
    const title = 'title';
    const price = 20;

    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', signin())
      .send({ title, price })
      .expect(201);

    const { id: ticketId } = response.body;

    const {
      body: { title: ticketTitle, price: ticketPrice },
    } = await request(app).get(`/api/tickets/${ticketId}`).send().expect(200);

    expect(ticketTitle).toEqual(title);
    expect(ticketPrice).toEqual(price);
  });
});
