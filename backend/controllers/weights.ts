import { Response, Router } from 'express';
import WeightModel from '../models/weight';

const weightsRouter = Router();

// Get All Weights
weightsRouter.get('/', async (req, res: Response) => {
  console.log('GET');
  const weights = await WeightModel.find({}).populate('user', { username: 1 });
  console.log('weights:', weights);
  res.json(weights);
});

// Get Weight by ID
weightsRouter.get('/:id', async (req, res: Response) => {
  const weight = await WeightModel.findById(req.params.id);
  if (weight) res.json(weight);
  else res.status(404).end();
});

// Add Weight
weightsRouter.post('/', async (req, res: Response) => {
  console.log('POST');
  const { body, user } = req;

  if (!user) {
    return res.status(401).json({ error: 'missing or invalid token' });
  }

  const weightObj = body.weight;
  const { weight, date } = weightObj;

  const newWeightModel = new WeightModel({
    weight,
    date,
    user: user.id,
  });

  user.weights = user.weights.concat(newWeightModel);
  await user.save();
  res.status(201).json({
    newWeightModel,
    success: true,
    message: 'Added weight successfully',
    weights: user.weights,
  });
});

// Not sure if I need this -
// Right now weights are deleted through usersRouter,
// but might want to verify token
weightsRouter.delete('/:id', async (req, res: Response) => {
  const { id } = req.params;
  const { user } = req;

  if (!user) {
    return res.status(401).json({
      error: 'missing or invalid token',
    });
  }

  const weightToDelete = await WeightModel.findById(id);

  if (weightToDelete?.user?.toString() !== user.id.toString()) {
    res.status(401).end();
  } else {
    await WeightModel.findByIdAndDelete(id);
    res.status(204).end();
  }
});

// Edit Weight
weightsRouter.put('/:id', async (req, res: Response) => {
  const { id } = req.params;
  const { weight, date } = req.body;

  const weightObj = {
    weight,
    date,
  };

  const updatedWeightModel = await WeightModel.findByIdAndUpdate(
    id,
    weightObj,
    {
      new: true,
    }
  );
  res.json(updatedWeightModel);
});

export default weightsRouter;
