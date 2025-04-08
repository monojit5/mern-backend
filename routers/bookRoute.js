const express = require('express');
const { bookcreate, bookfind, bookfindid, bookRemoved, bookUpdate, upload } = require('../controllers/bookController');
const router = express.Router();

router.post('/book', upload.single('photo'), bookcreate)
router.get('/book', bookfind)
router.get('/book/:id', bookfindid)
router.put('/book/update/:id',upload.single('photo'), bookUpdate)
router.delete('/book/delete/:id', bookRemoved)
module.exports = router;