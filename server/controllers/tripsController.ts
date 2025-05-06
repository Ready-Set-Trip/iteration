import db from '../models/databaseModel';
import { Request, Response, NextFunction } from 'express';
import { generateTripId, decodeTripId } from '../helperFuncs';

interface TripsController {
  createTrip(req: Request, res: Response, next: NextFunction): Promise<void>;
  getGroupStats(req: Request, res: Response, next: NextFunction): Promise<void>;
  validate(req: Request, res: Response, next: NextFunction): Promise<void>;
}

const tripsController: TripsController = {
  async createTrip(req, res, next) {
    // TODO: frontend still sending emails
    // should I be storing emails or unique user_ids?
    // Definitely need to send countdown_start and trip_start dates
    // do I need to send those back in the response for the Countdown purposes?
    const { tripName } = req.body;
    try {
      const result = await db.query('INSERT INTO trips (trip_name) VALUES ($1) RETURNING *', [tripName]);
      res.locals.tripId = generateTripId(result.rows[0].id as number);
      console.log(res.locals.tripId);
      return next();
    } catch (error) {
      return next({
        log: 'error in createTrip function',
        status: 500,
        message: { err: error.message },
      });
    }
  },

  async getGroupStats(req, res, next) {
    const { tripId } = req.params;
    const tripTableId = decodeTripId(tripId);
    try {
      // TODO: should we return the unique user ID instead of email for unique identifier?
      const result = await db.query(
        'SELECT name, id, workout_count, diet_count, language_count FROM users WHERE trip_id = $1',
        [tripTableId]
      );
      // console.log('result.rows: ', result.rows);
      res.locals.usersAndTrackers = result.rows;
      return next();
    } catch (error) {
      return next({
        log: 'error in getGroupStats function',
        status: 500,
        message: { err: error.message },
      });
    }
  },

  async validate(req, res, next) {
    const { tripId } = req.params;
    const tripTableId = decodeTripId(tripId);
    try {
      const result = await db.query('SELECT * FROM trips WHERE id = $1', [tripTableId]);
      return next();
    } catch (error) {
      return next({
        log: 'trip ID not found',
        status: 404,
      });
    }
  },
};

export default tripsController;
