import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const wordsStatisticSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  learned: {
    type: Number,
    required: true,
  },
  notLearned: {
    type: Number,
    required: true,
  }
});

export default mongoose.model('WordsStatistic', wordsStatisticSchema);