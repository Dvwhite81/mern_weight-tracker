import { Request, Response, Router } from 'express';
import axios from 'axios';
import 'express-async-errors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../utils/config';
import User from '../models/user';

const registerRouter = Router();

const handleNormalAuthRegister = async (req: Request, res: Response) => {
  console.log('req.body:', req.body);
  const { email, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    if (email === '' || password === '' || !passwordHash) {
      console.log('ERROR');
      return res.send({
        status: 400,
        success: false,
        message: 'All fields are required',
      });
    }
    const user = new User({
      email,
      passwordHash,
    });
    console.log('register user:', user);
    const savedUser = await user.save();
    res.status(201).json({
      success: true,
      message: 'Registered successfully',
      user: savedUser,
    });
  } catch (error) {
    console.log('error:', error);
  }
};

const handleGoogleAuthRegister = async (req: Request, res: Response) => {
  const { googleAccessToken } = req.body;

  const response = await axios.get(
    'https://www.googleapis.com/oauth2/v3/userinfo',
    {
      headers: {
        Authorization: `Bearer ${googleAccessToken}`,
      },
    }
  );

  const { email, username } = response.data;
  const existingUser = await User.findOne({ email: email });
  console.log('loginRouter existingUser:', existingUser);

  if (existingUser) {
    console.log('registerRouter user exists');
    return res.send({
      status: 401,
      success: false,
      message: 'User already exists. Try logging in.',
    });
  }

  try {
    const user = new User({
      email,
      username,
    });
    console.log('register user:', user);
    const savedUser = await user.save();

    const userForToken = {
      email: savedUser.email,
      id: savedUser._id,
    };

    const token = jwt.sign(userForToken, config.SECRET as string, {
      expiresIn: 60 * 60,
    });

    res.status(201).json({
      success: true,
      message: 'Registered successfully',
      user: savedUser,
      token: token,
    });
  } catch (error) {
    console.log('error:', error);
  }
};

registerRouter.post('/', async (req, res) => {
  // Normal auth
  if (!req.body.googleAccessToken) {
    handleNormalAuthRegister(req, res);
    // Google auth
  } else {
    handleGoogleAuthRegister(req, res);
  }
});

export default registerRouter;
