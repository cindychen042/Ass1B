const mongoose = require('mongoose')
const Article = require('./articles')

//under expirement.
const QueueArticlesSchema = new mongoose.Schema({
    title: { type: String, required: true },
  journal: { type: String },
  volume: {
    type: String,
  },
  number: { type: Number },
  pages: { type: String },
  authors: { type: String, required: true },
  source: { type: String, required: true },
  pubyear: { type: String },
  doi: { type: String },
  claim: { type: String },
  evidence: { type: String },
  status: {type:String,default:'pending',required:true},
  method:{type:String,required:true,default:'TDD' },

    article:[{ type: mongoose.Schema.Types.ObjectId,ref:'ArticleSchema'  // creating a foreign key which is ArticleSchema

}
]

})


const QueueSchema = mongoose.model("Queue", QueueArticlesSchema,'queues');

module.exports = QueueSchema;