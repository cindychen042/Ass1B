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
    const article = await Article.findById(req.params.id).then((res)=>{
        console.log("this is res")
        let obj = {title:'',journal:'',volume:'',number:'',authors:'',source:'',pubyear:'',doi:'',evidence:'',status:'',method:'',edited:'',pages:''}
        obj.title = res.title
        obj.journal = res.journal
        obj.volume = res.volume
        obj.number = res.number
        obj.authors = res.authors
        obj.source = res.source
        obj.doi = res.doi
        obj.status = res.status
        obj.method = res.method
        obj.edited = res.edited
        obj.pages = res.pages
        obj.evidence = res.evidence
        obj.pubyear = res.pubyear

        Article.deleteOne({title:obj.title}).then((res)=>{
            console.log('success!')
        })
        const addDeletedArticle = new DeletedArticle(obj)
        addDeletedArticle.save()

    })

    // to delete the original article from queue
    await QueueArticles.deleteOne({articleId:req.params.id}) // to delete it from the queue
    res.send("Article has been deleted.")
})


module.exports = router

