import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.set('strictQuery' , true); //****idk what this is ,yet
    //connecting the database
    mongoose.connect(url)
        .then(()=> console.log("MongoDB Connected"))
        .catch((err)=> console.log(err))
}

export default connectDB;