const express = require('express');
const app = express();
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

app.get('/api/data/:userId', (req, res) => { //get specific user
    let userId = req.params['userId'];
    pool.query(`SELECT * FROM users WHERE user_id=${userId}`)
    .then(result => {
        res.send(result.rows)
    })
})

app.get('/api/data/:userId/project', (req, res) => { //pulls all profile info for specific user
    let userId = req.params['userId'];
    pool.query(`SELECT * FROM projects WHERE user_id=${userId}`)
    .then(result => {
        res.send(result.rows)
    })
})

// adds new user data to the data base 
app.post('/api/data', (req,res)=>{ 
    let {username, first_name, last_name, summary, resume_link, github_link} = req.body; 

    if(username && first_name && last_name && summary && resume_link && github_link &&
         username.length != 0 && first_name.length != 0 && last_name.length != 0 && summary.length != 0 && resume_link.length != 0 && github_link.length != 0){
            pool.query (`INSERT INTO users (username, first_name, last_name, summary, resume_link, github_link) VALUES ($1, $2, $3, $4, $5, $6)`, [username, first_name, last_name,summary,resume_link, github_link])
            .then(results=>{
                res.status(201);
                res.send(`Added user data to database`);
            })
            .catch(err=>{
                console.log(err); 
            })
        }else{
            res.status(404);
            res.send(`404 ERROR: bad input please provide all input fields: username|first_name|last_name|summary|resume_link|github_link`)
        }
});

// update user data to the data base
app.patch('/api/data/:id', (req,res)=>{
    let {username, first_name, last_name, summary, resume_link, github_link} = req.body; 

    if(username && first_name && last_name && summary && resume_link && github_link &&
        username.length != 0 && first_name.length != 0 && last_name.length != 0 && summary.length != 0 && resume_link.length != 0 && github_link.length != 0){
           pool.query (`UPDATE users SET username = $1, first_name= $2, last_name=$3, summary=$4, resume_link=$5, github_link=$5) WHERE user_id = ${req.params.id}`, [username, first_name, last_name,summary,resume_link, github_link])
            .then(results=>{
                res.status(201);
                res.send(`Updated user data to data base`);
            })
            .catch(err=>{
                console.log(err);
            })
        }else{
            res.status(404);
            res.send(`404 ERROR: bad input please provide all input fields: username|first_name|last_name|summary|resume_link|github_link`)
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
app.post('/api/project', (req,res)=>{
   let {project_name, project_link, project_desc, user_id} = req.body;
   if(project_name && project_link && project_desc && user_id && project_name.length != 0 && project_link.length != 0 && project_desc.length != 0 && typeof user_id == 'number'){
    pool.query(`INSERT INTO projects (project_name, project_link, project_desc, user_id) VALUES ($1, $2, $3, $4)`, [project_name, project_link, project_desc, user_id])
    .then(()=>{
        res.status(201)
        res.send(`Added project to project table in capstone_data`)
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

app.listen(PORT, function() {
    console.log(`Server is running on ${PORT}`)
});