const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, enum:["Finance","Art","Travel", "Food","Education"] , message:"{VALUE is not supported}"},
    description: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    posts: { type: Number, default: 0 },
    thumbnail:{type: String, required: true},
},{timestamps:true})

module.exports = model('Posts', postSchema)