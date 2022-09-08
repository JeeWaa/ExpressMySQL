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
        var customerTableQuery = "CREATE TABLE IF NOT EXISTS customer (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), username VARCHAR(255), pasword VARCHAR(255) address VARCHAR(255), number VARCHAR(20))"
        connection.query(customerTableQuery, function (error, result) {
            if (result.warningCount === 0) {
                console.log("Customer table created");
            }
        })
    }
})

router.get('/', async (req,res) => {
    var query = "SELECT * FROM customer";
    connection.query(query, (error, row) => {
        if (error) console.log(error)
        res.send(row)
    })
})

router.post('/', (req,res) => {
    const id = req.body.id
    const name = req.body.name
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    const address = req.body.address
    const number = req.body.number

    var query = "INSERT INTO customer (id, name, email, username, password, address, number) VALUES (?, ?, ?, ?, ?, ?, ?)";

    connection.query(query, [id, name, email, username, password, address, number], (error) => {
        if (error) {
            res.send({ 'message': 'customer duplicate' })
        } else {
            res.send({ 'message': 'customer created' })
        }
    })
})

router.put('/', (req,res) => {
    const id = req.body.id
    const name = req.body.name
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    const address = req.body.address
    const number = req.body.number

    var query = "UPDATE customer SET name=? email=? username=? password=? address=? number=? WHERE id=?";

    connection.query(query, [id, name, email, username, password, address, number], (error,row) => {
        if (row.affectedRows > 0) {
            res.send({ 'message': 'customer updated' })
        } else {
            res.send({ 'message': 'customer not found' })
        }
    })
})

router.delete('/:id', (req,res) => {
    const id = req.body.id

    var query = "DELETE FROM customer WHERE id=?";

    connection.query(query, [id], (error,row) => {
        if (row.affectedRows > 0) {
            res.send({ 'message': 'customer deleted' })
        } else {
            res.send({ 'message': 'customer not found' })
        }
    })
})

router.get('/:id', (req, res) => {
    const id = req.body.id

    var query = "SELECT * from customer WHERE id=?";

    connection.query(query, [id], (error, row) => {
        if(error) {
            console.log(error)
        }else {
            res.send(row)
        }
    })
})