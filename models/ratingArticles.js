const mongoose = require("mongoose");
const ratingArticleSchema = new mongoose.Schema({
    articleID: {type: String},
    rating: {type: Number},
})
const Ratingarticle = mongoose.model("Rating Article", ratingArticleSchema,'rating articles');

module.exports = Ratingarticle;