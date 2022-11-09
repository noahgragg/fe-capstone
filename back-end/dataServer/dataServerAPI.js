const express = require('express');
const app = express();
const cors = require('cors')
const {Pool} = require('pg');
const config = require('./backendConfig')[process.env.NODE_ENV||"dev"]
const PORT = config.port
const pool = new Pool({
    connectionString: config.connectionString,
});
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));
pool.connect();

app.get('/', (req, res) => { //gets all user data to populate home page
    pool.query('SELECT * FROM users;')
    .then(result => {
        res.send(result.rows)
    })
})

app.get('/:userId', (req, res) => { //get specific user
    let userId = req.params['userId'];
    pool.query(`SELECT * FROM users where user_id=${userId}`)
    .then(result => {
        res.send(result.rows)
    })
})

app.get('/:userId/profile', (req, res) => { //pulls all profile info for specific user
    let userId = req.params['userId'];
    pool.query(`SELECT * FROM profiles WHERE user_id=${userId}`)
    .then(result => {
        res.send(result.rows)
    })
})
app.listen(PORT, function() {
    console.log(`Server is running on ${PORT}`)
});