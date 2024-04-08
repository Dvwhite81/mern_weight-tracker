import mongoose from 'mongoose';

const weightSchema = new mongoose.Schema({
  weight: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

weightSchema.set('toJSON', {
  transform: (document, returnedToDo) => {
    returnedToDo.id = returnedToDo._id.toString();
    delete returnedToDo._id;
    delete returnedToDo.__v;
  },
});

const ToDoModel = mongoose.model('ToDoModel', weightSchema);
export default ToDoModel;
