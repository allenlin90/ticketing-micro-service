import express from 'express';
import { json } from 'body-parser';

const app = express();
app.use(json());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`auth service is running on port: ${PORT}`);
});
