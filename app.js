const express = require('express')
const mysql = require('mysql')
const db = require('../myapp/configs/db.configs')

const app = express()
const port = 4000

app.use(express.json())

const connection = mysql.createConnection(db.database)
connection.connect(function (error) {
    if (error) {
        console.log(error)
    }else {
        console.log("Connected MYSQL")
    }
})

app.listen(port, () => {
    console.log(`app starting => ${port}`);
})

app.get('/', (req,res) => {
    console.log('get request')
    res.send('Hello...')
})