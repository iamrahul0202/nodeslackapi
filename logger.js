const winston = require('winston')
const format = winston.format

const path  = require('path')
const infoFile = path.resolve(__dirname,"app.info.log")
const errorFile = path.resolve(__dirname,"app.error.log")

module.exports.logger = winston.createLogger({
    format: format.prettyPrint({
        depth: 50
    }),
    transports: [
        new winston.transports.File({ filename: errorFile, level: 'error' }),
        new winston.transports.File({ filename: infoFile }),
        new winston.transports.Console()
    ]
})

// format: format.combine(
//     format.timestamp(),
//     format.logstash()

// ),