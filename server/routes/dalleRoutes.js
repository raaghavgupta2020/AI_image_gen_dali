import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration , OpenAIApi } from 'openai';

dotenv.config(); //to make sure that our environment variables are getting populated 

//we have to create a new instance of the router 
const router = express.Router();

//basically to use the openai_api_key we have to set it up like this 
const configuration = new Configuration({
    apiKey : process.env.OPENAI_API_KEY, //this we have already included in our .env file 
})

//we haave to create an instance of OpenAIApi (this we have imported)
const openai = new OpenAIApi(configuration); 

//we can create a demo route for testing the route
//**THIS IS A DEMO ROUTE **//
// router.route('/').get((req,res)=>{
//     res.send("Hello !!! from DALL-E");
// })

//NOW WE HAVE TO MAKE THE ACTUAL ROUTE , WHICH WILL ACTUALLY CONTACT THE OPEN AI API
router.route('/').post(async (req,res)=>{
    try {
        const {prompt} = req.body; //this prompt will come from the frontend 

        const aiResponse = await openai.createImage({
            prompt,
            n:1,
            size:'1024x1024', //here the x is really important 
            response_format:'b64_json',
        })

        //we need to get the image out from the aiResponse now 
        const image = aiResponse.data.data[0].b64_json;

        //we have to send this image to the frontend now 
        res.status(200).json({photo:image});

    } catch (error) {
        console.error(error);
        res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    }
})

export default router;