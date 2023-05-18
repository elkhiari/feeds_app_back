const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {connectToDb} = require('./db/db.config');
require('dotenv').config();
const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const router_Auth = require('./routes/users/auth.route');
const router_user = require('./routes/users/user.route');
const router_post = require('./routes/posts/post.route');


// middleware
app.use(express.json());
app.use(cors());



// routes
app.use('/',router_Auth)
app.use('/',router_user)
app.use('/posts',router_post)

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