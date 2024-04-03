

const mongoose = require('mongoose');

const Router = require('express').Router();


const User = require('../model/user');
const Transaction = require('../model/transaction');
const { handleEditUser } = require('../controller/user');

Router.get('/user', async (req, res) => {
    const users = await mongoose.model('User').find({});
    res.send(users);
});

Router.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    const user = await mongoose.model('User').findById(id);
    res.send(user);
}
);
Router.post('/user', async (req, res) => {
    const { name, email, password, role, subscription } = req.body;
    const user = new User({
        name,
        email,
        password,
        role,
        subscription
    });
    await user.save();
    res.send(user);
});
Router.patch('/user/:id', handleEditUser);

module.exports = Router;