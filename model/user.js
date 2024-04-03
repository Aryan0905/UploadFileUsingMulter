
//desiagn a schema for a user which will have a name, email, password, and a role and a subscription

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    subscription: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);