import db from '../models/databaseModel';
import { Request, Response, NextFunction } from 'express';

interface MessageBoardController {
  postMessage(req: Request, res: Response, next: NextFunction): Promise<void>;
  getHistory(req: Request, res: Response, next: NextFunction): Promise<void>;
}

const messageBoardController: MessageBoardController = {
  async postMessage(req, res, next) {
    try {
      const { name, message } = req.body;

      if (!name?.trim() || !message?.trim()) {
        return next({
          log: 'Invalid input in postMessage',
          status: 400,
          message: { err: 'Name and message are required' },
        });
      }

      const result = await db.query(
        `INSERT INTO messages (name, message)
         VALUES ($1, $2)
         RETURNING id, name, message, created_at`,
        [name.trim(), message.trim()]
      );

      res.locals.message = result.rows[0];
      return next();
    } catch (error) {
      return next({
        log: 'error in postMessage function',
        status: 500,
        message: { err: error.message },
      });
    }
  },

  async getHistory(req, res, next) {
    try {
      const result = await db.query(
        `SELECT id, name, message, created_at 
         FROM messages 
         ORDER BY created_at DESC`,
        []
      );
      res.locals.messages = result.rows;
      return next();
    } catch (error) {
      return next({
        log: 'error in getHistory function',
        status: 500,
        message: { err: error.message },
      });
    }
  },
};

export default messageBoardController;
