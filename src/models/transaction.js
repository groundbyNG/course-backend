import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    destination: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true,
    },
    passportId: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
})

export default mongoose.model('Transaction', transactionSchema);