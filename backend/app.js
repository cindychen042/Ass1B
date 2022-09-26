const Article = require('../models/articles')
const express = require('express');
const connectDB = require('../config/db');
const cors = require('cors')
const path = require('path')
const parser = require('body-parser') // to serialize the requests to json form
const app = express();

// Step 2:
app.use(cors({ origin: true, credentials: true }));
// Connect Database
connectDB();

let jsonParser = parser.json() //parse req.body to json
 


app.get('/',async function(req,res){
    const article = await Article.find()
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

const port = process.env.PORT || 8082;





app.listen(port, () => console.log(`Server running on port ${port}`));
