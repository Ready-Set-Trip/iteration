import db from '../models/databaseModel';
import { Request, Response, NextFunction } from 'express';

interface UsersController {
  incrementHabit(req: Request, res: Response, next: NextFunction): Promise<void>;
}
const usersController: UsersController = {
  // TODO: fix logic to increment habits (db.query needs to be written)
  // work with Pete on how the request will be formed
  async incrementHabit(req, res, next) {
    const { userId, habit } = req.params;
    console.log(userId, habit)
    try {
      const result = await db.query('UPDATE users SET $1 = $1 + 1 WHERE user_id = $2 RETURNING $1', [habit, userId]);
      res.locals.countAfterIncrement = result;
      console.log('result', result)
      return next();
    } catch (error) {
      return next({
        log: 'error in incrementHabit function',
        status: 500,
        message: { err: error.message },
      });
    }
  },
};

export default usersController;
