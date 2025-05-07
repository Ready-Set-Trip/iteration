import bcrypt from 'bcrypt';
import db from '../models/databaseModel';
import { Request, Response, NextFunction } from 'express';


interface LoginController {
  verifyUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}

// TODO: add an optional field to enter trip ID, will automatically assign user to that trip
// might have to change redirect options
// unless we just want to handle this on the create/join trip page

// TODO: for added security, should we do a dummy password db query?
// seems like we currently have a vulnerability to the Ashley Madison style attack
const loginController: LoginController = {
  async verifyUser(req, res, next) {
    const { email, password } = req.body;
    // error message
    const authError = {
      log: 'Authentication error',
      status: 401,
      message: { err: 'Invalid credentials' },
    };

    try {
      const result = await db.query('SELECT password, name, id, trip_id FROM users WHERE email = $1', [email]);
      // return 404 status if that Username isn't in the database
      if (result.rows.length === 0) {
        return next(authError);
      }

      const storedPass = result.rows[0].password;
      const passwordMatch = await bcrypt.compare(password, storedPass);
      
      if (!passwordMatch) {
        return next(authError);
      }

      res.locals.name = result.rows[0].name;
      res.locals.userId = result.rows[0].id;
      res.locals.tripId = result.rows[0].trip_id;
      res.locals.token = generateToken(result.rows[0].id, result.rows[0].name);
      
      return next();
      
    } catch (error) {
      return next({
        log: 'error in verifyUser function',
        status: 500,
        message: { err: 'Internal server error' },
      });
    }
  },
};

export default loginController;