// creates new trip in db POST
// fetches trip for a logged in user GET
// handle invites to a trip by adding a user to the trips table POST?

import express from 'express';

import variousController from '../controllers/variousController';

const router = express.Router();
// root of this file is localhost:3000/trips/ (used to be /characters)

// router.get('/:id', swapiController.getMoreCharacterData, (req, res) => {
//   res.status(200).json({ gotCharacters: res.locals.moreCharacters });
// });

// router.post('/', characterController.createCharacter, fileController.saveCharacter, (req, res) => {
//   res.status(200).json({ characters: res.locals.newCharacter });
// });

export default router;
