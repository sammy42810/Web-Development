import express from 'express';
import session from 'express-session';
import configRoutes from './routes/index.js';
import {requestLogger, requestCounter} from './middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
  session({
    name: 'AuthCookie',
    secret: 'CS554 Lab 1 super secret string!',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60 * 60 * 1000} // 1 hour
  })
);

// Application-wide middleware (#3 request logger, #4 request counter).
app.use(requestCounter);
app.use(requestLogger);

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
