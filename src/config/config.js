let dotenv = require('dotenv')

dotenv.config()


module.exports = {

    PORT: process.env.PORT,
    DBString: process.env.DB_String,
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD
}