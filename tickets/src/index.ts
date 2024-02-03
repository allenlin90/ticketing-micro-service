import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect('mongodb://tickets-mongo-srv:27017/tickets');
  } catch (err) {
    console.error(err);
  }

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`tickets service is running on port: ${PORT}`);
  });
};

start();
