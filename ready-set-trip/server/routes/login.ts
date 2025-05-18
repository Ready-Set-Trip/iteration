// authenticates user upon login
// (listens for a post request from front end login)

import express from 'express';
import loginController from '../controllers/loginController';

const router = express.Router();

// posting since with a get, we'd have to pass username/password through the URL
router.post('/', loginController.verifyUser, (req, res) => {
  // res.status(201).json({ msg: `${res.locals.name} logged in!`, userId: res.locals.userId, jwt: res.locals.token });
  res.status(201).json({ userId: res.locals.userId, tripId: res.locals.tripId });
});

export default router;
