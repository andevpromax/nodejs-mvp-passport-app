import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

export const init = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        const user = await User.findOne({ where: { email } });
        if (!user) return done(null, false);

        if (!bcrypt.compareSync(password, user.password))
          return done(null, false);

        return done(null, user);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = User.findOne({ where: { id } });
    done(null, user);
  });
};

export const protectRoute = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login?next=' + req.url);
};
