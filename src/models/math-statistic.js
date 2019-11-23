import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const taskStatisticSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    task: {
        type: String,
        required: true,
    },
    correct: {
        type: Boolean,
        required: true,
    }
});

export default mongoose.model('TaskStatistic', taskStatisticSchema);