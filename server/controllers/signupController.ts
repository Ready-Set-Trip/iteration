import bcrypt from 'bcrypt';
import db from '../models/databaseModel';
import { Request, Response, NextFunction } from 'express';

interface SignupController {
  createUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}

const signupController: SignupController = {
  async createUser(req, res, next) {
    const { name, email, password } = req.body;
    
    try {
      console.log('trying to createUser');
      const hashedPass = await bcrypt.hash(password, 10);
      
      // Store the query result in a variable
      const result = await db.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, trip_id',
        [name, email, hashedPass]
      );

      const newUser = result.rows[0];
      
      // Generate JWT token for the new user
      const token = generateToken({
        userId: newUser.id,
        name: newUser.name,
        tripId: newUser.trip_id
      });

      // Set response locals
      res.locals = {
        token,
        user: {
          userId: newUser.id,
          name: newUser.name,
          tripId: newUser.trip_id
        },
        name: newUser.name
      };
      
      return next();
    } catch (error: any) {
      if (error.code === '23505') { // Unique violation error code
        return next({
          log: 'Email already exists',
          status: 409,
          message: { err: 'Email already in use' },
        });
      }
      return next({
        log: 'error in createUser function',
        status: 500,
        message: { err: error.message },
      });
    }
  },
};

export default signupController;