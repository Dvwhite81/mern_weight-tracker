import { Router } from 'express';
import 'express-async-errors';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../utils/config';

import User from '../models/user';

const usersRouter = Router();

// Get All Users
usersRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Get User by Token
usersRouter.get('/:token', async (req, res) => {
  console.log('usersRouter get params:', req.params);
  const { token } = req.params;
  console.log('token:', token);
  const decoded = jwt.verify(token, config.SECRET as string) as JwtPayload;
  console.log('getByToken decoded:', decoded);

  const user = decoded;
  const { id } = user;

  const dbUser = await User.findById(id);

  res.json({
    success: true,
    user: dbUser,
  });
});

// Get User Weights by Username
usersRouter.get('/:username/weights', async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username: username });
  console.log('backend get user weights user:', user);
  if (user) {
    res.json({
      success: true,
      weights: user.weights,
    });
  } else {
    res.status(404).end();
  }
});

// Delete Weight
usersRouter.put('/:username/weights/:weightId', async (req, res) => {
  const { username, weightId } = req.params;
  console.log('usersRouter put weightId:', weightId);
  const user = await User.findOne({ username: username });

  if (user) {
    const { weights } = user;
    const newWeights = weights.filter(
      (weight) => weight._id.toString() !== weightId
    );

    user.weights = newWeights;
    await user.save();

    res.json({
      success: true,
      weights: newWeights,
    });
  } else {
    res.status(404).end();
  }
});

// Delete User
usersRouter.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default usersRouter;
