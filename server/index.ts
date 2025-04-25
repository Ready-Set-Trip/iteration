// set up your server (listen on port, etc) and set up access to the routes here 

import path from 'path';
import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('test');
  console.log('hello');
});
/**
 * require routers
 */
import authenticationRouters from './routes/authentication';
import signupRouters from './routes/signup';
import tripParametersRouters from './routes/tripParameters';
import tripsRouters from './routes/trips';

/**
 * handle parsing request body
 */
app.use(express.json());

// allow frontend and backend to be run together with Cross-Origin Resource Sharing (CORS)
app.use(
    cors({
        origin: 'http://localhost:5173',
    })
);

/**
 * handle requests for static files
 */

// using path.resolve for express.static is recommended
//app.use(express.static(path.join(__dirname, '../client'))); // don't know if we have any static files yet, was causing errors

/**
 * define route handlers
 */
app.use('/authentication', authenticationRouters);
app.use('/signup', signupRouters);
app.use('/tripParameters', tripParametersRouters);
app.use('/trips', tripsRouters);

// route handler to respond with main app

// catch-all route handler for any requests to an unknown route
app.use((req, res) => {
  res.sendStatus(404);
});

/**
 * configure express global error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */
app.use((err, req, res, next) => {
  console.log('logging err:', err);
  console.log('type of error:', typeof err);
  // defaultErr object
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);

  return res.status(errorObj.status).send(errorObj.message);
});

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

export default app;