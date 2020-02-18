import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const vocabulabSchema = new Schema({
  russian: {
    type: String,
    required: true,
  },
  english: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Vocabulab', vocabulabSchema);