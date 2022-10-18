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
router.get('///:id([0-9a-fA-F]{24})',async function(req,res){
    console.log("param id is " +req.params.id);
    let ratingArr = [];
    const article = await Ratingarticle.find({articleID: req.params.id})
    article.forEach(function(article){
        ratingArr.push(article.rating);
    });
    console.log("rating arr has : "+ ratingArr);
    var sum = 0;
    for (var number of ratingArr) {
        sum += number;
    }
    var average = sum / ratingArr.length;
    console.log("get article given id working, average rating is: "+ average);
    res.send(JSON.stringify(average));
})


/*
this POST method submits the articleID and Rating ONLY,
 not the entire document
*/
router.post('/:id([0-9a-fA-F]{24})',jsonParser,(req,res)=>{
    console.log("post working")
    const paramid = req.params.id
    const newratingArticle = new Ratingarticle({
        articleID: paramid,
        rating: req.body[0],
    })
    newratingArticle.save();
    res.send("Rating save.");
})

module.exports = router;