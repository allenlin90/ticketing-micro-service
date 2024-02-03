import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';
import { NotFoundError } from '@gittix-ticketing/common';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const { id: ticketId } = req.params;

  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    throw new NotFoundError();
  }

  res.send(ticket);
});

export { router as showTicketRouter };
