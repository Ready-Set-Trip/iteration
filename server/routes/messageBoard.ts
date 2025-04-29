import express from 'express';
import messageBoardController from '../controllers/messageBoardController';


const router = express.Router();

router.post('/', messageBoardController.verifyUser, (req, res) => {
    res.status(201).json({ msg: `${res.locals.name} logged in!`, jwt: res.locals.token });
  });

export default router;
