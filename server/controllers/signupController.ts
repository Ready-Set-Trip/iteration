import path from 'path';
import bcrypt from 'bcrypt';
import db from '../models/databaseModel';

const signupController = {
  async createUser(req, res, next) {
    const { username, password } = req.body;
    try {
      console.log('trying to createUser');
      const hashedPass = await bcrypt.hash(password, 10);
      res.locals.createdUser = await db.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [
        username,
        hashedPass,
      ]);
      return next();
    } catch (error) {
      return next({
        log: 'error in createUser function',
        status: 500,
        message: { err: error.message },
      });
    }
  },
};

export default signupController;
