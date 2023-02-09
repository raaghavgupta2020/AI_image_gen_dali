//our job is to add additional routes which we can call from the frontend
import express from 'express';
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

// import Post from '../mongodb/models/post.js';
import Post from '../mongodb/models/post.js'

dotenv.config(); //to make sure that our environment variables are getting populated 

//we have to create a new instance of the router 
const router = express.Router();

//we have to configure cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

//we have to create 2 routes 

//1)GET ALL POSTS 
router.route('/').get(async(req,res)=>{
    try {
        const posts = await Post.find({})
        res.status(200).json({success:true , data:posts});
    } catch (error) {
        res.status(500).json({success:false , message:'fetching posts failed , try again'});
    }
})

// //2)CREATE A POST 
router.route('/').post(async (req,res)=>{
    try {
        const {name , prompt , photo} = req.body; //we are sending this from the frontend 
        const photoUrl = await cloudinary.uploader.upload(photo);//basically uploading the photo to cloudinary

        //we have to add this post in our database 
        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url //we are basically saving the url of the photo uploaded in the cloudinary , instead of storing the photo in b64_json format , beacuse it is a much more scalable approach
        })

        res.status(200).json({success: true , data: newPost}); //sending newPost as data 
        //we have to put everything in a try catch block
    } catch (error) {
        res.status(500).json({success: false , message: 'Unable to create a post , try again'})
    }
})

//cloudinary is basically aa platform that stores our images and we can retireve it whenever we want 

export default router;