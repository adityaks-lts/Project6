const {model, Schema} = require("mongoose");

const bookSchema = new Schema({
    title:{type:String, require:true},
    price:{type:Number, require:true},
    genre:{type:String, require:true},
    author:{type:String, require:true},
})

const bookModel = model("books", bookSchema);
module.exports = bookModel