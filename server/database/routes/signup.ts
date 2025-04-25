// new user registration ... uses hashing/bcrypt to handle pw

// checks to see if user exists,
// if not, sets up pw and saves new user


import express, { json } from 'express';
import bcrypt from 'bcrypt';
import db from '../models/databaseModel';
import variousController from '../controllers/variousController';

const router = express.Router();

router.post('/', variousController.createUser, (req, res) => {
    res.status(201).json({ user: res.locals.createdUser })
});

export default router;