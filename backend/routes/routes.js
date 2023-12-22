import express from 'express'
import {Book} from '../models/book_model.js'
import bodyParser from 'body-parser'

const router = express.Router()

export const routes = router

const parser = bodyParser


router.post('/', parser.json(), async (req, res) => {
    const bookData = new Book({
        title:req.body.title,
        author:req.body.author,
        yearPublished:req.body.yearPublished,
        genre:req.body.genre,
        price: req.body.price,
    })

    try{
        const dataToSave = await bookData.save()
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

router.get('/', parser.json(), async (req, res) => {
    try{
        const books = await Book.find()
        return res.status(200).json({
            count: books.length,
            data: books
        })
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

router.get('/:id', parser.json(), async (req, res) => {
    try{
        const book = await Book.findById(req.params.id)
        return res.status(200).json(book)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

router.patch('/:id', parser.json(), async (req, res) => {
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.yearPublished ||
            !req.body.genre ||
            !req.body.price 
        ){
            return res.status(400).send({
                message:'Send all required fields: title, author, yearPublished, genre, price'
            })
        }
        const id = req.params.id
        const updatedData = req.body
        const options = {new: true}

        const result = await Book.findByIdAndUpdate(
            id, updatedData, options
        )

        if(!result){
            return res.status(404).json({message: 'Book not found; what the book was that?'})
        }

        return res.status(404).json({message: 'Book updated successfully'})
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

router.delete('/:id', parser.json(), async (req, res) =>{
    try{
        const id = req.params.id
        const data = await Book.findByIdAndDelete(id)
        res.send(`Document with ${data.title} has been deleted.`)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})
