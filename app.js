const express = require('express');
const morgan = require('morgan');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

//LOGER
app.use(morgan('dev'));

//HEALTH
app.get('/',(req,res)=>res.status(200).send('API IS RUNNING HEALTHY'));

app.listen(PORT, () => {
    console.log(`Server on http://${HOST}:${PORT}`);
})