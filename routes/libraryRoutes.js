const { Router } = require("express");
const bookModel = require("../models/bookSchema")
const libraryRouter = Router()

libraryRouter.get("/",async(req, res)=>{
    try{
        const  books = await bookModel.find();
        res.json({books:books})
    }
    catch(err){ console.log(err)
        res.status(500).send("Internal server error")
    }
})

libraryRouter.post("/",async(req, res)=>{
    try{
        const book = new bookModel(req.body)
        await book.save()
        res.sendStatus(201);
    }
    catch(err){ console.log(err)
        res.status(500).send("Internal server error")
    }
})

module.exports = libraryRouter;