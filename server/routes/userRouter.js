const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const router = express.Router();

//Sign Up
router.post('/signup', async(req, res) => {
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const user = new User({
            name: req.body.firstName,
            email: req.body.email,
            password: hash
        });

        await user.save();
        res.status(200).send("User has been created");
    } catch(error) {
       console.log(error);
    }
});

//login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log(user);
        if(!user)
            return "User not Found";
        
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if(!isPasswordCorrect)
            return "Wrong Password";
        else {
            res.status(200).send(user);
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;