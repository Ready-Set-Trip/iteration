import bcrypt from 'bcrypt';
import db from '../models/databaseModel';

const signupController = {
  async createUser(req, res, next) {
    console.log('req.body: ', req.body)
    const { name, email, password } = req.body;
    res.locals.name = name;
    try {
      console.log('trying to createUser');
      const hashedPass = await bcrypt.hash(password, 10);
      res.locals.createdUser = await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [
        name,
        email,
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
