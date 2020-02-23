import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const libraryStatisticSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('LibraryStatistic', libraryStatisticSchema);