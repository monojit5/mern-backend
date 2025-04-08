
const Book = require('../models/bookModels');
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

const bookcreate = async (req, res) => {
 
    const {bookname, authers, price, description} = req.body;
    const photo = req.file ? `/images/${req.file.filename}` : "";
try {
   if (!bookname||!authers ||!photo ||!price ||!description) {
    return res.status(500).json({msg: 'plese fill up all the field'})
   }
 const book = await Book.create({bookname, authers, photo, price, description})
 console.log(book)
 return res.status(200).json({book: book})
} catch (error) {
 console.log(error) 
 return res.status(500).json({msg: error})  
}
};

const bookfind = async (req, res) => {
 try {
  const findbook = await Book.find();
  console.log(findbook) 
  return res.status(200).json({book: findbook})
 } catch (error) {
   return res.status(500).json({msg:error}) 
 }
};

const bookfindid = async (req, res) => {
  const {id} = req.params;
 try {
  const idShow = await Book.findById(id)
  console.log(idShow)
  return res.status(200).json({book: idShow})
 } catch (error) {
  console.log(error)
  return res.status(500).json({msg: error})
 }
};

const bookUpdate = async (req, res) => {
  const { id } = req.params;
  const { bookname, authers, price,  description } = req.body;
  const photo = req.file ? `/images/${req.file.filename}` : null;
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { bookname, authers, price,  description, photo },
      { new: true, runValidators: true } 
    );

    if (!updatedBook) {
      return res.status(404).json({ msg: "Book not found" });
    }

    console.log(updatedBook);
    return res.status(200).json({ update: updatedBook });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};


const bookRemoved = async (req, res) => {
 const {id} = req.params;
 try {
  const removed = await Book.findByIdAndDelete(id)
  console.log(removed)
  return res.status(200).json({remove: removed})
 } catch (error) {
  console.log(error)
  return res.status(500).json({msg: error})
 }
};
module.exports = {bookcreate, bookfind, bookfindid, bookRemoved, bookUpdate, upload}