const express = require('express');
const router =  express.Router();
const SignUp = require("../models/signup");
const bcrypt = require('bcryptjs');


//create a new user
router.post( '/', async(req,res) => {
    const { Username,  Email, Password,ConfirmPassword } = req.body;
    const user = await SignUp.findOne({Email});
    
    const salt =await bcrypt.genSalt(10);
    secpass =  await bcrypt.hash(req.body.Password , salt);


    if(user)
    {
        return res.status(409).json({message : "User Already Exist"});
    }
    else if (Password !== ConfirmPassword) {
    return res.status(400).json({
        message: "Passwords do not match"
    });
}
      const newUser = await SignUp.create({
        Username,
        Email,
        Password : secpass,
        ConfirmPassword,
     });
     const data = {
    newUser : {
            id : newUser.id
        }
     }
    res.status(201).json({message : "SignUp Successful"});
});

module.exports = router;