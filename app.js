const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config();
const cors = require('cors');
const connectDb = require('./database/db')
const bookRouter = require('./routers/bookRoute');
const  registerRouter  = require('./routers/userRoute');
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/images', express.static('public/images'));

app.use(cors({
   origin:"http://localhost:5173",
   methods:"GET,POST, PUT, DELETE" 
}))
app.use('/api',bookRouter)
app.use('/user', registerRouter)
app.use(express.static(path.join(__dirname, "frontend", "dist")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

connectDb();
app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))