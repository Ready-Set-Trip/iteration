// authenticates user upon login
// (listens for a post request from front end login)

import express from 'express';
import loginController from '../controllers/loginController';

const router = express.Router();

// posting since with a get, we'd have to pass username/password through the URL
router.post('/', loginController.verifyUser, (req, res) => {
  res.status(201).json({ user: `${res.locals.username} logged in!` });
});

export default router;
