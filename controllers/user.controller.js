const jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const asyncHandler = require('express-async-handler');

const Signup = asyncHandler(async(req,res) =>{
    const {username,email,password} = req.body;
    console.log(req.body);
    if(!username || !email || !password)
    {
        res.status(403).json({
            success:false,
            message: ' Please fill the required field'
        })
    }
    
    const userExist = await User.findOne({email});
    if(userExist)
    {
        console.log(userExist);
        res.status(404).json({
            success:false,
            message : 'User Already Exist !'

        })
    }
    else
    {     
        const salt = await bcrypt.genSalt(10);
        const Hashedpassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            email,
            password:Hashedpassword,
        });

        user
        .save()
        .then(()=>{
            res.status(200).json({
                success: true,
                message: "User Added Successfully",
                _id:user.id,
                token:GenerateToken(user.id),
              })
            })
            .catch((err) => res.status(400).json("Error :" + err));

    }

})
const update = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    const {username,address} = req.body;
    const myQuery = {_id:id};
    const newvalues = {$set :{username:username,address:address}}
    User.updateOne(myQuery, newvalues)
    .then(()=>{
        res.status(200).json({
            success:true,
            message: "User data updated Successfully",
        })
    })
    .catch((err) => res.status(400).json("Error :"))

})
const Signin = asyncHandler(async (req,res) =>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password)))
    {
        res.status(200).json({
            success:true,
            message: "User LoggedIn Successfully",
            _id:user.id,
            token:GenerateToken(user._id),
        })
    }
    else{
        res.status(404).json({
            success:false,
            message:'Invalid Credentials',
        })
    }

})

const getUser = asyncHandler(async (req,res)=>{
    let user = await User.find({_id:req.params.id});
    res.status(200).send({
        success:true,
        data:user,
    })
})

const GenerateToken = (id) => {
    let token = jwt.sign({ id }, process.env.secretKey, { expiresIn: "10d" });
    return token;
};

module.exports ={Signup,Signin,getUser,update}
