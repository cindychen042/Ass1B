const articles = require('../models/articles')
const queue = require('../models/analyser')
const connectDB = require('../config/db');
const mongoose = require('mongoose')

// Connect Database
connectDB();
 
// make a connection 
mongoose.connect('mongodb+srv://cise_db:VAko3pw9drWF5PRS@cluster0.0dktgqg.mongodb.net/?retryWrites=true&w=majority');
 

let article = new articles({title:"some title",authors:"some author",source:"some source"
})

let q = new queue()
q.title = 'title'
q.authors = 'author'
q.source = 'source'
q.article.push(article)
q.save()


article.save((err,message)=>{
    console.log(message.title)
})