const Article = require('../../../models/articles')
const QueueArticles = require('../../../models/analyser')
const DeletedArticle =  require('../../../models/deletedarticles')
const express = require('express');
const cors = require('cors')
const path = require("path");
const parser = require('body-parser'); // to serialize the requests to json form
const router = express.Router();

let jsonParser = parser.json() //parse req.body to json


router.get('/',async function(req,res){
    const article = await Article.find()
    console.log(article)
    res.send(article)
})


router.get('/:id([0-9a-fA-F]{24})',async function(req,res){
    const article = await Article.findById(req.params.id)
    res.send(article)
})


router.post('/articles',jsonParser,(req,res)=>{
    let data = {
        ...req.body
    }
    console.log("this is data")
    console.log(req.body)
    const newArticle = new Article({...data})
    newArticle.save()
    res.send("The Submission is now in hand of the moderator to be accepted or rejected.")
})

router.delete('/:id([0-9a-fA-F]{24})',async function(req,res){
    const article = await Article.findById(req.params.id)
    article.delete(article)
})


module.exports = router

