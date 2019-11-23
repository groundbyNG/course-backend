import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    formula: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    }
});

export default mongoose.model('Task', taskSchema);