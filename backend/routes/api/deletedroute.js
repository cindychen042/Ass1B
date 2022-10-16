const Article = require('../../../models/articles')
const QueueArticles = require('../../../models/analyser')
const DeletedArticle =  require('../../../models/deletedarticles')
const express = require('express');
const cors = require('cors')
const path = require("path");
const parser = require('body-parser'); // to serialize the requests to json form
const router = express.Router();

router.get('/', async function (req, res) {
    const deleted = await DeletedArticle.find()
    res.send(deleted)
})

module.exports = router