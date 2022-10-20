const Article = require('../../../models/articles')
const Ratingarticle = require('../../../models/ratingArticles')
const express = require('express');
const cors = require('cors')
const path = require("path");
const parser = require('body-parser'); // to serialize the requests to json form
const router = express.Router();

let jsonParser = parser.json() //parse req.body to json

router.get('/',async function(req,res){
    const article = await Article.findById()
    res.send(article)
    console.log(article)
   
})

/*
this GET method returns the AVERAGE RATING ONLY, not the entire document
*/
router.get('/:id([0-9a-fA-F]{24})',async function(req,res){
    let ratingArr = [];
    const article = await Ratingarticle.find({articleID: req.params.id})
    article.forEach(function(article){
        ratingArr.push(article.rating);
    });
    var sum = 0;
    for (var number of ratingArr) {
        sum += number;
    }
    var average = sum / ratingArr.length;
    res.send(JSON.stringify(average.toFixed(2)));
})


/*
this POST method submits the entire information of the article 
INCLUDING the rating
*/
router.post('/:id([0-9a-fA-F]{24})',jsonParser,(req,res)=>{
    const paramid = req.params.id;
    const newratingArticle = new Ratingarticle({
        articleID: paramid,
        rating: req.body[1],
        title: req.body[0].title,
        journal: req.body[0].journal,
        volume: req.body[0].volume,
        number: req.body[0].number,
        pages: req.body[0].pages,
        authors: req.body[0].authors,
        source: req.body[0].source,
        pubyear: req.body[0].pubyear,
        doi: req.body[0].doi,
        claim: req.body[0].claim,
        evidence: req.body[0].evidence,
        status: req.body[0].status,
        method: req.body[0].method,
        edited: req.body[0].edited,
    })
    newratingArticle.save();
    res.send("Rating save.");
})

module.exports = router;