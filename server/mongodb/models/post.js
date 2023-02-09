import mongoose from "mongoose";

//creating new post schema
const Post = new mongoose.Schema({
    name:{type:String,required:true},
    prompt:{type:String,required:true},
    photo:{type:String,required:true}
})

//we have to create a model from this schema 
const PostSchema = mongoose.model('Post' , Post); //'Post is the name of the model'

export default PostSchema;
//mongoDB work is done , now we'll be creating the routes 