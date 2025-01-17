import express from 'express';
import passport from '../config/passport.config.js';

const router = express.Router();

// Route for initiating Google OAuth 2.0
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile');
  }
);

export default router ;