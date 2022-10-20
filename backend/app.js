const Article = require('../models/articles')
const QueueArticles = require('../models/analyser')
const DeletedArticle =  require('../models/deletedarticles')
const express = require('express');
const connectDB = require('../db');
const cors = require('cors')
const path = require("path");
const parser = require('body-parser'); // to serialize the requests to json form
const app = express();
const mongoose = require('mongoose')
const http = require('http');


//calling all the routers 
const articles = require('./routes/api/articleroute');
const analyser = require('./routes/api/analyserroute');
const deleted = require('./routes/api/deletedroute')
const rating = require('./routes/api/ratingroute');


app.use(express.static(path.resolve(__dirname, "../frontend/build")));

// Step 2:
app.use(cors({ origin: true, credentials: true }));
// Connect Database
app.use(express.json({ extended: false }));

//Connect Database.

connectDB();

let jsonParser = parser.json() //parse req.body to json
 

// connecting the routes with their views

app.use('/api',articles)
app.use('/api/analyser',analyser)
app.use('/deleted',deleted)
app.use('/search/userview',rating)



//the port will either aim at the localhost or the deployed host on heroku
const port = process.env.PORT || 8082;

//connecting the frontend with backend
app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });



  const httpServer = new http.Server(app);
  const server = httpServer.listen(port, () =>
    console.log(`Server running on port ${port}`)
  );
  





module.exports ={
    server,
}

//app.listen(port, () => console.log(`Server running on port ${port}`))