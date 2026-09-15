import {Router} from 'express';
import {createUser, checkUserLogin} from '../data/users.js';

const router = Router();

const sendError = (res, e) => {
  if (e && typeof e === 'object' && e.status)
    return res.status(e.status).json({error: e.error});
  return res.status(400).json({error: typeof e === 'string' ? e : 'An unexpected error occurred'});
};

router.route('/signup').post(async (req, res) => {
  const {name, username, password} = req.body || {};

  if (name === undefined || username === undefined || password === undefined) {
    return res.status(400).json({error: 'name, username, and password are all required'});
  }

  try {
    const newUser = await createUser(name, username, password);
    return res.status(200).json(newUser);
  } catch (e) {
    return sendError(res, e);
  }
});

router.route('/login').post(async (req, res) => {
  const {username, password} = req.body || {};
  if (username === undefined || password === undefined) {
    return res.status(400).json({error: 'username and password are both required'});
  }

  try {
    const user = await checkUserLogin(username, password);
    // Store an identifying representation of the user in the session.
    req.session.user = {_id: user._id, username: user.username};
    return res.status(200).json(user);
  } catch (e) {
    return sendError(res, e);
  }
});


router.route('/logout').get(async (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(200).json({message: 'You were not logged in, but you are now logged out'});
  }

  req.session.destroy(() => {
    res.clearCookie('AuthCookie');
    return res.status(200).json({message: 'You have been successfully logged out'});
  });
});

export default router;