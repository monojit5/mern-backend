const User = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer  = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + "-" + file.originalname;
    cb(null, filename);
  }
})
const upload = multer({ storage: storage })

const register = async (req, res) => {
const {username, email, password,  address, city, phone,  } = req.body;
const  avator = req.file ? `/images/${req.file.filename}` : "";
try {
    if (!username ||!email ||!password ||!address ||!city ||!phone) {
      return res.status(500).json({msg:"plese fill up all the field"})  
    }
    const presentUser = await User.findOne({email})
    if (presentUser) {
        return res.status(500).json({msg:"user is all ready present"})  
    }
    const hasedPassword = await bcrypt.hash(password, 10)
    const crerteUser = await User.create({username, email, address, city, avator, phone,  password:hasedPassword})
    console.log(crerteUser)
    return res.status(200).json({user: crerteUser})
} catch (error) {
  console.log(error)  
  return res.status(500).json({msg: error})
}
};

const login = async (req, res) => {
const {email, password} = req.body;
try {
    if (!email ||!password) {
        return res.status(500).json({msg:"plese fill up all the field"})     
    }
    const exitesUser = await User.findOne({email})
    if (!exitesUser) {
        return res.status(500).json({msg:"plese register first"})    
    }
    const isMatch = await bcrypt.compare(password, exitesUser.password)
    if (!isMatch) {
        return res.status(500).json({msg:"invalid email and password"}) 
    }
    const auth =[{username:exitesUser.username}]
    const token = await jwt.sign({_id: exitesUser._id},process.env.TOKEN,{expiresIn:'7d'}) 
    return res.status(200).json({
      token,
      user: {
        id: exitesUser._id,
        username: exitesUser.username,
        email: exitesUser.email,
        profileImage: exitesUser.avator
      }
    });
} catch (error) { 
    console.log(error)
    return res.status(500).json({msg: error})
}
}




module.exports = {register, login, upload};
