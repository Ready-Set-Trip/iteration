import path from 'path';
import bcrypt from 'bcrypt';
import db from '../models/databaseModel';

const authenticationController = {
  async verifyUser(req, res, next) {
    const { username, password } = req.body;
    try {
      console.log('trying to verifyUser');
      const result = await db.query('SELECT password FROM users WHERE username = $1', [username]);
      // return 404 status if that Username isn't in the database
      if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });

      const user = result.rows[0];
      res.locals.username = user.username;
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) return next();
      else
        return next({
          log: "verifyUser: username and password don't match",
          status: 401,
          message: { err: 'Username and/or password is incorrect' },
        });
    } catch (error) {
      return next({
        log: 'error in verifyUser function',
        status: 500,
        message: { err: error.message },
      });
    }
  },
};

export default authenticationController;
