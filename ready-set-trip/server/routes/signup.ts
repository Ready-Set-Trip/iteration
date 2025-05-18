// new user registration ... uses hashing/bcrypt to handle pw

// checks to see if user exists,
// if not, sets up pw and saves new user

import express from 'express';
import signupController from '../controllers/signupController';

const router = express.Router();

router.post('/', signupController.createUser, (req, res) => {
  res.status(201).json( { msg: `${res.locals.name} signed up!`  });
});

export default router;
