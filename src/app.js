const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();


const router = require('./routes/index');
const swaggerSetup = require('./config/swagger');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

swaggerSetup(app);


app.get('/', (req, res) => {
    res.json({
        message: 'Assalamualaikum',
    });
});

app.use('/' , router);

module.exports = app;