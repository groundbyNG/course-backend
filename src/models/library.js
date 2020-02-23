import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const librarySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  }
});

export default mongoose.model('Library', librarySchema);