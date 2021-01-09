var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
const cors = require('cors');
app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser())

module.exports = app;

const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
    .catch(err => {
        console.log(err);
    });

const athleteApiRouter = require('./routes/api/AthleteApiRoute');
app.use('/api/athletes', athleteApiRouter);

const managerApiRouter = require('./routes/api/ManagerRoute');
app.use('/api/managers', managerApiRouter);

const transferApiRouter = require('./routes/api/TransferRoute');
app.use('/api/transfers', transferApiRouter);


