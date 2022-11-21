require('dotenv').config();

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const cors = require('cors')
const {Pool} = require('pg');
const config = require('./dataServerConfig')[process.env.NODE_ENV||"dev"]
const PORT = config.port
const pool = new Pool({
    connectionString: config.connectionString,
    
});
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));
pool.connect();

app.get('/api/data', (req, res) => { //gets all user data to populate home page
    pool.query('SELECT * FROM users;')
    .then(result => {
        res.send(result.rows)
    })
})
app.get('/keys', (req,res)=>{
    res.json(({
        s3AccessKey: process.env.S3_ACCESS_KEY,
        s3SecretKey: process.env.S3_SECRET_KEY,
        bucketURL: process.env.BUCKET_URL,
        authURL: process.env.AUTH_URL,
        dataURL: 'https://dataserverapi.onrender.com'
      }))
})
//route to get userId from userName 
app.get('/api/data/userId/:userName', (req, res)=>{
    let userName= req.params['userName'];
    pool.query(`SELECT * FROM users WHERE username = '${userName}'`)
    .then(result=>{
        res.send(result.rows)
        console.log('server userId:', result.rows)
    })
})

app.get('/api/data/:userId', (req, res) => { //get specific user
    let userId = req.params['userId'];
    
    pool.query(`SELECT * FROM users WHERE user_id=${userId}`)
    .then(result => {
        res.send(result.rows)
    })
})

app.get('/api/data/:userId/project', (req, res) => { //pulls all profile info for specific user
    let userId = req.params['userId'];
    //console.log(userId);
    pool.query(`SELECT * FROM projects WHERE user_id=${userId}`)
    .then(result => {
        res.send(result.rows)
    })
})

// adds new user data to the data base 
app.post('/api/data', (req,res)=>{ 
    let {username, first_name, last_name} = req.body; 

    if(username && first_name && last_name &&
         username.length != 0 && first_name.length != 0 && last_name.length != 0){
            pool.query (`INSERT INTO users (username, first_name, last_name, profile_image) VALUES ($1, $2, $3,'No Image')`, [username, first_name, last_name])
            .then(results=>{
                res.status(201);
                res.send(`Added user data to database`);
            })
            .catch(err=>{
                console.log(err); 
            })
        }else{
            res.status(404);
            res.send(`404 ERROR: bad input please provide all input fields: username|first_name|last_name|summary|linkedin_link|github_link`)
        }
});
app.patch('/api/data/photo', authenticateToken,(req, res)=> {
    let { image, username } = req.body
    console.log(req.body)
    pool.query(`UPDATE users SET profile_image='https://fe-capstone-bucket.s3.us-east-2.amazonaws.com/${image}' WHERE username='${username}';`)
    .then(results => {
        res.status(201)
        res.send('Added image URL to database')
    })
    .catch(err=>{
        res.status(404)
        console.log(err)
    })
})
// update user data to the data base
app.patch('/api/data/:id', authenticateToken, (req,res)=>{
    let {first_name, last_name, summary, linkedin_link, github_link} = req.body; 
console.log("request to update userdata:",req.body)
    if(first_name && last_name && summary && linkedin_link && github_link &&
         first_name.length != 0 && last_name.length != 0 && summary.length != 0 && linkedin_link.length != 0 && github_link.length != 0){
           pool.query (`UPDATE users SET first_name= $1, last_name=$2, summary=$3, linkedin_link=$4, github_link=$5 WHERE user_id = ${req.params.id}`, [first_name, last_name,summary,linkedin_link, github_link])
            .then(results=>{
                res.status(201);
                res.send({message:`Updated user data to data base`});
            })
            .catch(err=>{
                console.log(err);
            })
        }else{
            res.status(404);
            res.send(`404 ERROR: bad input please provide all input fields: username|first_name|last_name|summary|linkedin_link|github_link`)
        }
});

// delete user from the data base by id 
app.delete('/api/data/:id', (req,res)=>{
    pool.query(`SELECT FROM users WHERE user_id = ${req.params.id}`)
    .then(results=>{
        if(results.rows.length == 0){
            res.status(404); 
            res.send(`User doesn't exist in the database`);
            return;
        }else{
            res.status(200);
            res.send(`User data deleted from database`);
            pool.query(`DELETE FROM users WHERE user_id = ${req.params.id}`);
        }
    })
});

//Post / Create new project 
app.post('/api/project', authenticateToken, (req,res)=>{
    console.log("adding project:" , req.body)
   let {project_name, project_link, project_desc, user_id} = req.body;
   if(project_name && project_link && project_desc && user_id && project_name.length != 0 && project_link.length != 0 && project_desc.length != 0 && typeof user_id == 'number'){
    pool.query(`INSERT INTO projects (project_name, project_link, project_desc, user_id) VALUES ($1, $2, $3, $4)`, [project_name, project_link, project_desc, user_id])
    .then(()=>{
        res.status(201)
        res.send({message:`Added project to project table in capstone_data`})
    })
    .catch(err=>console.log(err))
   }else{
        res.status(404);
        res.send(`404 ERROR: bad input please provide all input fields: project_name|project_link|project_desc|user.id`)
   }
});



//Delete project by id 
app.delete('/api/project/:id', (req,res)=>{
    pool.query(`SELECT FROM projects WHERE project_id = ${req.params.id}`)
    .then(results=>{
        if(results.rows.length == 0){
            res.status(404); 
            res.send(`User doesn't exist in the database`);
            return;
        }else{
            pool.query(`DELETE FROM projects WHERE project_id = ${req.params.id}`)
            res.status(200);
            res.send(`Project deleted from database`);
        }
    });
});

// update project by ID 
app.patch('/api/project/:id', authenticateToken, (req, res) => {
    let {project_name, project_link, project_desc} = req.body;
    if(project_name && project_link && project_desc && project_name.length != 0 && project_link.length != 0 && project_desc.length != 0){
        pool.query(`UPDATE projects SET project_name= $1, project_link=$2, project_desc=$3 WHERE project_id=${req.params.id}`, [project_name, project_link, project_desc])
        .then(()=>{
            res.status(201)
            res.send({message: 'Updated project in capstone_data'});
        })
        .catch(err=>console.log(err))
    }else{
        res.status(404);
        res.send(`404 ERROR: bad input please provide all input fields: project_name|project_link|project_desc|user_id|project_id`)
    }    
});

////////////USER LOGIN SECTION////////////////

// Get username and passwords for all users ADMIN 
app.get('/users/credentials', (req, res)=>{
    pool.query('SELECT * FROM login_credentials;')
    .then(result => {
        res.send(result.rows)
    })
})

// create username and password route 
app.post('/user/create', async(req,res)=>{
    console.log(req.body.username, req.body.password)
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log(hashedPassword)
        const user = {username: req.body.username, password: hashedPassword}
        pool.query(`INSERT INTO login_credentials (username, password) VALUES ($1, $2)`, [user.username, user.password])
        res.status(201).send(`user successfully added to database`)
    }catch{
        res.status(500).send('error creating new user')
    }
})

// allow user to login by verifying credentials input on FE with Database
app.post('/user/login', async (req,res)=>{
   console.log('login username', req.body.username)
      let results = await pool.query(`SELECT * FROM login_credentials WHERE username = '${req.body.username}'`)
      console.log('length', results.rows.length);
           if(results.rows.length == 0){
               res.status(400); 
               res.send(`User doesn't exist in the database`);
               return;
           }
               const user = results.rows
               console.log(user[0].password)
               console.log(req.body.password)
               console.log(user[0].username)
               try{
                   if(await bcrypt.compare(req.body.password, user[0].password)){
                       // Needs more input back to client side to change state of FE to use authorization being logged in
                       res.status(201);
                       res.send({'username': user[0].username});
                   }else {
                       res.send('Not allowed / incorrect password')
                   }
               }catch{
                   res.status(500).send('error passwords issue')
               }
        })

//middleware function to authenticate Token upon posting, updating or deleting content from FE
function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)
        
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
        if (err) return res.sendStatus(403)
        req.user = user
        console.log('authenticationToken: passed')
        next()
    })
}


app.listen(PORT, function() {
    console.log(`Server is running on ${PORT}`)
});