// new user registration ... uses hashing/bcrypt to handle pw

// checks to see if user exists,
// if not, sets up pw and saves new user

import express, { json } from 'express';
import signupController from '../controllers/signupController';

const router = express.Router();

router.post('/', signupController.createUser, (req, res) => {
  res.status(201).json({ user: res.locals.createdUser.rows[0] });
});

export default router;
