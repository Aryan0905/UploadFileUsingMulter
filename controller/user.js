

const moongose = require('mongoose');
const User = require('../model/user');
const Transaction = require('../model/transaction');
const { lock } = require('../Router/user');
// const user = require('../model/user');
// const User = require('../model/user');


const handleEditUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role, subscription } = req.body;
    try {
        const user = await User.findById(id);
        // user.name = name;
        // user.email = email;
        // user.password = password;
        // user.role = role;
        user.subscription = subscription;
        await user.save();
        // res.redirect('/user/transaction');  //redirect to the transaction page
        const transaction = new Transaction({
            user: user,
            subscription: subscription,
            date: new Date(),
            status: "success"
        });


        await transaction.save();

        res.send(user);

    }
    catch (err) {
        console.log(err);
        res.status(400).send("Error updating user");
    }

}



module.exports = {
    handleEditUser,
}