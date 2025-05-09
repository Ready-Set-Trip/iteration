import db from '../models/databaseModel';
import { Request, Response, NextFunction } from 'express';

interface Message {
  id: number;
  name: string;
  message: string;
  created_at: string;
  tripID: string;
}
interface MessageBoardController {
  postMessage(req: Request, res: Response, next: NextFunction): Promise<void>;
  getHistory(req: Request, res: Response, next: NextFunction): Promise<void>;
}
const messageBoardController = {
  async postMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, message, tripID } = req.body;

      // Validate all required fields
      if (!name?.trim() || !message?.trim() || !tripID?.trim()) {
        return res.status(400).json({
          error: 'Name, message, and tripID are required'
        });
      }

      // Insert into database
      const result = await db.query(
        `INSERT INTO messages (name, message, "tripID")
         VALUES ($1, $2, $3)
         RETURNING id, name, message, created_at, "tripID"`,
        [name.trim(), message.trim(), tripID.trim()]
      );

      // Return the newly created message
      return res.status(201).json({
        message: result.rows[0],
        success: true
      });
      
    } catch (error) {
      console.error('Database error in postMessage:', error);
      return res.status(500).json({
        error: 'Failed to post message',
        details: error.message
      });
    }
  },

  async getHistory(req: Request, res: Response) {
    try {
      const { tripID } = req.query;

      if (!tripID) {
        return res.status(400).json({
          error: 'tripID is required'
        });
      }

      const result = await db.query(
        `SELECT id, name, message, created_at, "tripID"
         FROM messages 
         WHERE "tripID" = $1
         ORDER BY created_at DESC`,
        [tripID]
      );

      return res.status(200).json({
        messages: result.rows,
        count: result.rowCount
      });
    } catch (error) {
      console.error('Database error in getHistory:', error);
      return res.status(500).json({
        error: 'Failed to fetch messages',
        details: error.message
      });
    }
  }
};

export default messageBoardController;