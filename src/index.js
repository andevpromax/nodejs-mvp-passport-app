import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import path from 'path';

import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';

import { init as initAuth } from './auth.js';

import db from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'pug');

initAuth();

app.use(
  session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, 'views'));

app.use('/', authRoutes);
app.use('/', dashboardRoutes);

db.sync({ force: false }).then(() => {
  app.listen(port, console.log('Server is running on port: ' + port));
});
