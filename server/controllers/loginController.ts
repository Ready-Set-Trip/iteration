import bcrypt from 'bcrypt';
import db from '../models/databaseModel';
import { Request, Response, NextFunction } from 'express';

interface LoginController {
  verifyUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}

// TODO: add an optional field to enter trip ID, will automatically assign user to that trip
// might have to change redirect options
// unless we just want to handle this on the create/join trip page
const loginController: LoginController = {
  async verifyUser(req, res, next) {
    const { name, email, password } = req.body;
    res.locals.name = name;
    try {
      console.log('trying to verifyUser');
      const result = await db.query('SELECT password FROM users WHERE email = $1', [email]);
      // return 404 status if that Username isn't in the database
      if (result.rows.length === 0) {
        return next({
          // TODO: fix logs/messages to obfuscate whether user or pass is wrong
          log: 'verifyUser: username not found',
          status: 404,
          message: { err: 'Username not found' },
        });
      }

      const storedPass = result.rows[0].password;
      console.log('stored pass', storedPass);
      const passwordMatch = await bcrypt.compare(password, storedPass);
      if (passwordMatch) return next();
      else
        return next({
          // TODO: fix logs/messages to obfuscate whether user or pass is wrong
          log: 'verifyUser: incorrect password',
          status: 401,
          message: { err: 'Password is incorrect' },
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

export default loginController;
