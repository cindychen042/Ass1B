const mongoose = require("mongoose");
const articleSchema = new mongoose.Schema({
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
  method:{type:String,required:true,default:'TDD' }
});

const Article = mongoose.model("Article", articleSchema,'articles');

//Creating a table (schema), where title,author, and source fields are required to fill in order to submit some article

//This file is well formatted using Prettier.

module.exports = Article;
