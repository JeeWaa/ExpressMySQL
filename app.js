const express = require('express')
const customer = require('./routes/customer')

const app = express()
const port = 4000

app.use(express.json())

app.listen(port, () => {
    console.log(`app starting => ${port}`);
})

app.use('/customer', customer)