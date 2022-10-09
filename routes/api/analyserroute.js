
const Article = require('../../models/articles')
const QueueArticles = require('../../models/analyser')
const DeletedArticle =  require('../../models/deletedarticles')
const express = require('express');
const cors = require('cors')
const path = require("path");
const parser = require('body-parser'); // to serialize the requests to json form
const router = express.Router();

let jsonParser = parser.json() //parse req.body to json


router.get('/analyser/articles',async function(req,res){
    const articlesInQueue = await QueueArticles.find()
    res.send(articlesInQueue)
})

router.get('/analyser/articles/:id([0-9a-fA-F]{24})',async function(req,res){
    const article = await QueueArticles.findById(req.params.id)
    console.log(req.params.id)
    res.send(article)

})

router.post('/analyser/articles',jsonParser,async function(req,res){
    let data = {
        ...req.body
    }
    const article_ = await Article.find(data)
    if(article_){
        const articleSentToQueue = new QueueArticles()
        articleSentToQueue.articleId = data._id
        console.log(articleSentToQueue)
        articleSentToQueue.save()
        res.send(articleSentToQueue.articleId)
    }
    else{
        res.status(404).send("Article not found")
    }
    

})



router.put('/articles/:id',jsonParser, async function (req,res){
    console.log(req.body)
    let data = {
        ...req.body
    }
    console.log(data)
    const {title,authors,journal,number,pages,doi,pubyear,source,evidence,claim,volume} = data

    const article = await Article.findById(req.params.id)
    const articleInQueue = await QueueArticles.findOneAndUpdate({'articleId':req.params.id},{'edited':true})
    articleInQueue.save()

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
    article.edited = true
    article.save()
    console.log(article)
    
    res.send("Article has been updated.")
})

module.exports = router