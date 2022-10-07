const mongoose = require('mongoose')
const Article = require('./articles')

//under expirement.
const QueueArticlesSchema = new mongoose.Schema({
  articleId:{type:String,required:true},
  edited:{type:Boolean,default:false},

})


const QueueSchema = mongoose.model("Queue", QueueArticlesSchema,'queues');

module.exports = QueueSchema;