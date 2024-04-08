import { Request, Response, Router } from 'express';
import axios from 'axios';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../utils/config';
import User from '../models/user';

const loginRouter = Router();

const handleNormalAuthLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  console.log('loginRouter user:', user);
  const correctPassword =
    user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash as string);

  if (!user || !correctPassword) {
    console.log('loginRouter returning error');
    return res.send({
      status: 401,
      success: false,
      message: 'Invalid email or password',
    });
  }

  console.log('loginRouter after error');
  const userForToken = {
    email: user.email,
    id: user._id,
  };

  const token = jwt.sign(userForToken, config.SECRET as string, {
    expiresIn: 60 * 60,
  });

  res.status(200).send({
    token,
    success: true,
    message: 'Logged in successfully',
    user: user,
    weights: user.weights,
  });
};

const handleGoogleAuthLogin = async (req: Request, res: Response) => {
  const { googleAccessToken } = req.body;

  const response = await axios.get(
    'https://www.googleapis.com/oauth2/v3/userinfo',
    {
      headers: {
        Authorization: `Bearer ${googleAccessToken}`,
      },
    }
  );

  const { email } = response.data;
  const user = await User.findOne({ email: email });
  console.log('loginRouter user:', user);

  if (!user) {
    console.log('loginRouter returning error');
    return res.send({
      status: 401,
      success: false,
      message: 'Invalid username or password',
    });
  }

  const userForToken = {
    email: user.email,
    id: user._id,
  };

  const token = jwt.sign(userForToken, config.SECRET as string, {
    expiresIn: 60 * 60,
  });

  res.status(200).send({
    token,
    success: true,
    message: 'Logged in successfully',
    user: user,
    weights: user.weights,
  });
};

loginRouter.post('/', async (req, res) => {
  // Normal auth
  if (!req.body.googleAccessToken) {
    console.log('normal');
    handleNormalAuthLogin(req, res);
    // Google auth
  } else {
    console.log('google');
    handleGoogleAuthLogin(req, res);
  }
});

export default loginRouter;
