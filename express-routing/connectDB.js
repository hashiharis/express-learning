const mongoose=require("mongoose")

const connectDb=async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/testdb')
        console.log("db connected")
    }
    catch(error){
        console.log("Error on connecting to database")
    }
}

module.exports=connectDb;