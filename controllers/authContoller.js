const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.register = async (req,res) =>{
  try {
    const {username,password} = req.body;
    const user = new User({username,password});
    await user.save();
    res.status(201).json({message: 'User registered successfully'});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

exports.login = async (req,res) =>{
  try{
    const {username,password} = req.body;
    const user = await User.findOne({username});
    if(!user || !(await user.comparePassword(password))){
      res.status(401).json({error: 'Invalid username or password'})
    }
    const token = jwt.sign({userId: user._id},process.env.JWT_SECRET,{expiresIn: '1h'});
    res.cookie('token', token,{httpOnly: true, secure: false});
    res.json({message:'login successful',token});
  }
  catch (err){
    res.status(500).json({error: err.message});
  }
  
};

exports.logout = async (req,res) =>{
  res.clearCookie('token');
  res.json({message: 'Logged out successfully'});
}
