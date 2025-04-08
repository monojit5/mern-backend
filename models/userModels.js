const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   username:{
    type: String,
    required: true
   },
   email:{
    type: String,
    required: true,
    unique: true
   },
   password:{
    type: String,
    required: true
   },
   address:{
    type: String,
    required: true
   },
   city:{
    type: String,
    required: true
   },
   phone:{
    type: Number,
    required: true
   },
   avator:{
    type: String,
    default:"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
   },
},{timestamps:true});
const User = mongoose.model('User',userSchema);
module.exports = User;