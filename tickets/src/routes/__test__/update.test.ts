import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

describe('update route', () => {
  it('returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    return request(app)
      .put(`/api/tickets/${id}`)
      .set('Cookie', signin())
      .send({ title: 'title', price: 20 })
      .expect(404);
  });

  it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    return request(app)
      .put(`/api/tickets/${id}`)
      .send({ title: 'title', price: 20 })
      .expect(401);
  });

  it('returns a 401 if the user does not own the ticket', async () => {
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', signin())
      .send({ title: 'title', price: 20 });

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', signin())
      .send({ title: 'title', price: 20 })
      .expect(401);
  });

  it('returns a 400 if the user provides an invalid title or price', async () => {
    const userCookie = signin();

    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', userCookie)
      .send({ title: 'title', price: 20 })
      .expect(201);

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', userCookie)
      .send({ title: '', price: 20 })
      .expect(400);

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', userCookie)
      .send({ title: 'title', price: -20 })
      .expect(400);
  });

  it('updates the ticket provided valid inputs', async () => {
    const userCookie = signin();
    const updatedTitle = 'title_1';
    const updatedPrice = 10;

    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', userCookie)
      .send({ title: 'title', price: 20 })
      .expect(201);

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', userCookie)
      .send({ title: updatedTitle, price: updatedPrice })
      .expect(200);

    const ticketResponse = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .set('Cookie', userCookie)
      .send()
      .expect(200);

    expect(ticketResponse.body).toEqual(
      expect.objectContaining({
        title: updatedTitle,
        price: updatedPrice,
      })
    );
  });
});
