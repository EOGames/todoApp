require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Router = require('./routes/task.route');
const app = express();
const port  = process.env.PORT || 3001

app.use(cors());
app.use(express.json());
app.use('/api',Router);

app.listen(port,()=>
{
    console.log(`Server is Up and Running At Port ${port}`);
});