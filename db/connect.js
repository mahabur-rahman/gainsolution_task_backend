const mongoose = require('mongoose')
const DB = process.env.MONGO_URI;

// connect with db 
const connectedDB = async() =>{
    try{
        const conn = await mongoose.connect(DB)
        console.log(
            `Mongodb Connection Successful : ${conn.connection.host}`.cyan.underline
          );

    }catch(err){
        console.log(`No connection : ${err}`)
    }
}

module.exports = connectedDB