let express = require('express')
let app = express()
let helmet = require('helmet')
let {dbConnection} = require('./src/config/dbConfig')
let route = require('./src/route/route')
let config = require('./src/config/config')


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(helmet())
app.use(route)

const serverStart = async()=>{
    try {
        dbConnection()
        app.listen(config.PORT, ()=>{
            console.log('Express app running on', config.PORT)
        })
    } catch (error) {
        console.log(error.message)
    }
}

serverStart()