const constants = require('./constants')
const express = require('express')

const app = express()
const port = process.env.PORT || constants.appPort

app.use(express.json()) // for parsing application/json
app.listen(port, () => console.log(`Example app listening at port ${port}`))

const map = {
    home: '/',
    webhook: '/webhook'
}

//webhook
require('./webhook')(app, map.webhook)

//Boot Express
app.get(map['home'], (req, res) => res.send(map))


