const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type:String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

//hashing password before saving ,its an middleware
userSchema.pre('save',async function(next) {
  if(!this.isModified('password')){
    return next();
  }else{
    this.password = await bcrypt.hash(this.password,10);
    next();
  }
});

// method to compare the passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword,this.password);
}

module.exports = mongoose.model('user', userSchema);