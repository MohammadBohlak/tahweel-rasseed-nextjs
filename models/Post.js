const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    name : String,
    value: Number,
    price: Number,
    cost : Number,
    date : String
})


export default mongoose.models.Post || mongoose.model('Post',postSchema )