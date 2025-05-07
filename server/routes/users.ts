import express from 'express';
import usersController from '../controllers/usersController';

const router = express.Router();

// updating DB to increment trip
router.patch('/:user/:habit', usersController.incrementHabit, (req, res) => {
  res.status(200).json({ countAfterIncrement: res.locals.countAfterIncrement });
});

router.patch('/setTrip', usersController.setUserTrip, (req, res) => {
  res.status(200).json({ msg: `user successfully added to trip!`});
})

// do I need a get request for a specific user's habits? 
// we will get the current habits for each user 

export default router;
