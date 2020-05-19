const winston = require('winston')
const format = winston.format
module.exports.logger = winston.createLogger({
    format: format.combine(
        format.timestamp(),
        format.logstash()

    ),

    transports: [
        new winston.transports.File({ filename: 'app.error.log', level: 'error' }),
        new winston.transports.File({ filename: 'app.info.log' }),
        new winston.transports.Console()
    ]
})