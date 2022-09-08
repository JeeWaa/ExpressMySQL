const express = require('express')
const mysql = require('mysql')
const db = require('../configs/db.configs')
const router = express.Router()

const connection = mysql.createConnection(db.database)
connection.connect(function (error) {
    if (error) {
        console.log(error)
    }else {
        console.log("Connected MYSQL")
        var productTableQuery = "CREATE TABLE IF NOT EXISTS product (code VARCHAR(255) PRIMARY KEY, item VARCHAR(255), category VARCHAR(255), description VARCHAR(255), price DOUBLE, qty INTEGER)"
        connection.query(productTableQuery, function (error, result) {
            if (result.warningCount === 0) {
                console.log("Product table created");
            }
        })
    }
})

router.get('/', async (req,res) => {
    var query = "SELECT * FROM product";
    connection.query(query, (error, row) => {
        if (error) console.log(error)
        res.send(row)
    })
})

router.post('/', (req,res) => {
    const code = req.body.code
    const item = req.body.item
    const category = req.body.category
    const description = req.body.description
    const price = req.body.price
    const qty = req.body.qty

    var query = "INSERT INTO product (code, item, category, description, price, qty) VALUES (?, ?, ?, ?, ?, ?)";

    connection.query(query, [code, item, category, description, price, qty], (error) => {
        if (error) {
            res.send({ 'message': 'product duplicate' })
        } else {
            res.send({ 'message': 'product created' })
        }
    })
})

router.put('/', (req,res) => {
    const code = req.body.code
    const item = req.body.item
    const category = req.body.category
    const description = req.body.description
    const price = req.body.price
    const qty = req.body.qty

    var query = "UPDATE product SET item=? category=? description=? price=? qty=? WHERE code=?";

    connection.query(query, [code, item, category, description, price, qty], (error,row) => {
        if (row.affectedRows > 0) {
            res.send({ 'message': 'product updated' })
        } else {
            res.send({ 'message': 'product not found' })
        }
    })
})

router.delete('/:code', (req,res) => {
    const code = req.body.code

    var query = "DELETE FROM product WHERE code=?";

    connection.query(query, [code], (error,row) => {
        if (row.affectedRows > 0) {
            res.send({ 'message': 'product deleted' })
        } else {
            res.send({ 'message': 'product not found' })
        }
    })
})

router.get('/:code', (req, res) => {
    const code = req.body.code

    var query = "SELECT * from product WHERE code=?";

    connection.query(query, [code], (error, row) => {
        if(error) {
            console.log(error)
        }else {
            res.send(row)
        }
    })
})