let mongoose = require('mongoose')
let config = require('./config')



exports.dbConnection = async()=>{
    try {
      await mongoose.connect(config.DBString)
      console.log('Mongodb Connected')
        
    } catch (error) {
        console.log(error.message)
    }
}