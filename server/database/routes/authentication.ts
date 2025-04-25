// authenticates user upon login
// (listens for a post request from front end login)

import express from 'express';
import bcrypt from 'bcrypt';

import variousController from '../controllers/variousController';

const router = express.Router();
// root of this file is localhost:3000/authentication/ (used to be /characters)

// router.get('/:id', swapiController.getMoreCharacterData, (req, res) => {
//   res.status(200).json({ gotCharacters: res.locals.moreCharacters });
// });

// router.post('/', characterController.createCharacter, fileController.saveCharacter, (req, res) => {
//   res.status(200).json({ characters: res.locals.newCharacter });
// });

export default router;
