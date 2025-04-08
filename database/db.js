const mongoose = require('mongoose');
const connectDb = async () => {
try {
   await mongoose.connect(process.env.DATABASE)
   console.log('database connect successfully...')
} catch (error) {
    console.log(error)
}
}
module.exports = connectDb