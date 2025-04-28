import db from '../models/databaseModel';

const userController = {
    // TODO: fix logic to increment habits (db.query needs to be written)
    // work with Pete on how the request will be formed
  async incrementHabit(req, res, next) {
    const { user, toIncrement } = req.body;
    try {
      const result = await db.query('SELECT password FROM users WHERE email = $1', [toIncrement]);
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

export default userController;
