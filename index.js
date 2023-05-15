const express = require('express');
const {connectToDb} = require('./db/db.config');
const router_Auth = require('./routes/users/auth.route');
const router_user = require('./routes/users/user.route');
require('dotenv').config();
const app = express();

// middleware
app.use(express.json());



// routes
app.use('/',router_Auth)
app.use('/',router_user)


// connect to db and server
const startingServer = (URI,PORT)=>{
    try {
        connectToDb(URI)
        app.listen(PORT,console.log(`Server is running on http://localhost:${PORT}`));
    } catch (error) {
        console.log(error)
    }
}


startingServer(process.env.URI,process.env.PORT)