const express = require('express')
const mysql = require('mysql2/promise')

const app = express()
app.use(express.json())
const port = 8001

let conn = null

const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        port: 3306,
        database: 'food_online'
    })
}

app.get('/', async (req, res) => {
    try{
        const [results] = await conn.query('SELECT * FROM member')
        res.json(results)
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.listen(port, async (req, res) => {
    await initMySQL()
    console.log(`Server is running on port ${port}`)
})