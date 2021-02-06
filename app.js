const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const app = express();
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

const authApiRouter = require('./routes/api/AuthApiRoute');
app.use('/api/auth', authApiRouter);

app.use(expressJwt({secret: '3lQlhbogjkf47exA2u8JuIMYiSgX11hl', algorithms: ['HS256']}).unless({path: ['/api/auth']}));
