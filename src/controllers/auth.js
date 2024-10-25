import bcrypt from 'bcryptjs';
import passport from 'passport';
import User from '../models/User.js';

const registerView = (req, res) => {
  res.render('register');
};

const loginView = (req, res) => {
  res.render('login');
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.render('register', { error: 'Please fill all fields' });
  }

  if (await User.findOne({ where: { email } })) {
    return res.render('register', {
      error: 'A user account already exists with this email',
    });
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      res.redirect('login?registrationdone');
    } else {
      return res.render('register', { error: 'User creation failed' });
    }
  } catch {
    console.error('Error while creating user:', error);
    return res.render('register', {
      error: 'An error occurred. Please try again.',
    });
  }
};

const loginUser = (req, res) => {
  passport.authenticate('local', {
    successRedirect: '/?loginsuccess',
    failureRedirect: '/login?error',
  })(req, res);
};

const logoutUser = (req, res) => {
  req.logout(() => res.redirect('/login?loggedout'));
};

export default {
  registerView,
  loginView,
  registerUser,
  loginUser,
  logoutUser,
};
