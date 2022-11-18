require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors'); 
const config = require('./authServerConfig.js')[process.env.NODE_ENV||"dev"]
const PORT = config.port


const jwt = require ('jsonwebtoken');

app.use(cors())
app.use(express.json())



//function that generates user access token and sets expiration timeout
function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "20m"} )
}


//login route 
app.post('/user/login/token', (req,res)=>{
    //Authenticate user done on dataServer API but does this need to be pulled to this API?


    const username = req.body.username
    const user = {name:username}

    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    res.send({accessToken: accessToken, refreshToken: refreshToken})
})

//check that the token is valid
app.post('/token', (req,res)=>{
    const refreshToken = req.body.accessToken
    //check if token exist
    if(refreshToken == null) return res.sendStatus(401)
    //need to check if the refresh token is still valid or has been removed
    //need to check this against the locally stored user token not sure how
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user)=>{
        if(err) return res.sendStatus(403)
        // generate accessToken just need to get the name of the user object
        const accessToken= generateAccessToken({name:user.name})
        res.json({accessToken: accessToken})
    })
})

//LOGOUT user deletes the refreshTokens which we would need to clear local storage
app.delete('user/logout', (req,res)=>{
    //need to identify the refreshTokens for the user and delete them from local storage
    //need to check that the token inside of our local storage is not equal to the req.body.token that we pass up to it

    //send status stating token was successfully deleted
    res.sendStatus(204)
})


// Server listening on port 
app.listen(PORT, function() {
    console.log(` AuthServer is running on ${PORT}`)
});