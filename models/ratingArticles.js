const mongoose = require("mongoose");
const ratingArticleSchema = new mongoose.Schema({
    articleID: {type: String},
    rating: {type: Number},
    title: { type: String},
    journal: { type: String },
    volume: {
        type: String,
    },
    number: { type: Number },
    pages: { type: String },
    authors: { type: String },
    source: { type: String},
    pubyear: { type: String },
    doi: { type: String },
    claim: { type: String },
    evidence: { type: String },
    status: {type:String},
    method:{type:String},
    edited:{type:Boolean}
})
const Ratingarticle = mongoose.model("Rating Article", ratingArticleSchema,'ratingArticles');

module.exports = Ratingarticle;