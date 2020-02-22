import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const taskStatisticSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    correct: {
        type: Number,
        required: true,
    },
    attempts: {
        type: Number,
        required: true,
    }
});

export default mongoose.model('TaskStatistic', taskStatisticSchema);