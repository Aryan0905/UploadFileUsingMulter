

//design a schema for a purchasing of subscription which will have a user, subscription, and a date and status of the transaction

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    subscription: {
        type: String,
        ref: 'Subscription'
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);