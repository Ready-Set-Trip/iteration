import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

// updating DB to increment trip
router.patch('/:habit', userController.incrementHabit, (req, res) => {
  res.status(201).json({ msg: `${res.locals.name} logged in!` });
});

export default router;
