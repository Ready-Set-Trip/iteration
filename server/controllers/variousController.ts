// don't have one called various ... haha .. this is just a placeholder.

// various controllers go in this folder -- not fully thought out, can discuss!
// one to handle login, one to handle trips (creation / accessing existing trip), one for setting trip parameters ...

import path from 'path';
import bcrypt from 'bcrypt';
import db from '../models/databaseModel';

const variousController = {
  async createUser(req, res, next) {
    const { username, password } = req.body;
    try {
      console.log('trying to createUser');
      res.locals.createdUser = await db.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [
        username,
        password,
      ]);
      return next();
    } catch (err) {
      return next('error in createUser: ', err);
    }
  },
};

export default variousController;
