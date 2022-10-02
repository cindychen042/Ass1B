const Article = require('../models/articles')
const QueueArticles = require('../models/analyser')
const express = require('express');
const connectDB = require('../config/db');
const cors = require('cors')
const parser = require('body-parser'); // to serialize the requests to json form
const app = express();
const mongoose = require('mongoose')

// Step 2:
app.use(cors({ origin: true, credentials: true }));
// Connect Database
connectDB();

let jsonParser = parser.json() //parse req.body to json
 


app.get('/',async function(req,res){
    const article = await Article.find()
    res.send(article)
})


app.get('/:id([0-9a-fA-F]{24})',async function(req,res){
    const article = await Article.findById(req.params.id)
    res.send(article)
})




app.post('/articles',jsonParser,(req,res)=>{
    let data = {
        ...req.body
    }
    console.log("this is data")
    console.log(req.body)
    const newArticle = new Article({...data})
    newArticle.save()
    res.send("The Submission is now in queue to be accepted or rejected.")
})


app.get('/analyser/articles',async function(req,res){
    const articlesInQueue = await QueueArticles.find()
    res.send(articlesInQueue)
})

app.get('/analyser/articles/:id([0-9a-fA-F]{24})',async function(req,res){
    const article = await QueueArticles.findById(req.params.id)
    console.log(req.params.id)
    res.send(article)

})

app.put('/articles/:id',jsonParser, async function (req,res){
    console.log(req.body)
    let data = {
        ...req.body
    }
    console.log(data)
    const {title,authors,journal,number,pages,doi,pubyear,source,evidence,claim,volume} = data

    const article = await Article.findById(req.params.id)
    article.title = title
    article.authors = authors
    article.journal = journal
    article.number = number
    article.pages = pages
    article.doi = doi
    article.pubyear = pubyear
    article.source = source
    article.evidence = evidence
    article.claim = claim
    article.volume = volume
    article.save()
    
    res.send("Article has been updated.")
})

const port = process.env.PORT || 8082;





app.listen(port, () => console.log(`Server running on port ${port}`));
