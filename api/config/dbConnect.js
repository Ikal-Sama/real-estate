const { default: mongoose } = require("mongoose")


const dbConnect = () => {
    try{
        const conn = mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected Succesfully")
    }catch(error){
        console.log("Database connection Failed")
    }
}

module.exports = dbConnect