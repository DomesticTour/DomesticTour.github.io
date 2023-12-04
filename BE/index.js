const cors = require('cors');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT;
// const {userRoutes, productRoutes } = require('./routes/allroutes');
const initConnection = require('./DB/config');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());
app.use(cors({
  origin: '*'
}));
// app.use(userRoutes, productRoutes);
initConnection();

app.listen(port, () => console.log('Example app listening on port ' + port +'!'))
