const express = require('express')
const bookRouter = express.Router()
const Book = require('../models/book.js')

// Get All
bookRouter.get('/', (req, res, next) => {
  Book.find((err, books) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(books)
  })
})

//GET by author
bookRouter.get('/:authorId', (req, res, next) => {
  Book.find({author: req.params.authorId}, (err, books) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(books)
  })
})

// Add new book
bookRouter.post('/', (req, res, next) => {
  const newBook = new Book(req.body)
  newBook.save((err, savedBook) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedBook)
  })
})

//like a book
bookRouter.put("/like/:bookId", (req, res, next) => {
  Book.findOneAndUpdate(
    { _id: req.params.bookId },
    { $inc: { likes: 1 }},
    { new: true },
    (err, updatedBook) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedBook)
    }
  )
})

module.exports = bookRouter