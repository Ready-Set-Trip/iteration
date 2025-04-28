import express from 'express';
import usersController from '../controllers/usersController';

const router = express.Router();

// updating DB to increment trip
router.patch('/:user/:habit', usersController.incrementHabit, (req, res) => {
  res.status(204).json({ countAfterIncrement: res.locals.countAfterIncrement });
});

export default router;
