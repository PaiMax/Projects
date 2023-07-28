const express=require('express');
const bodyParser = require('body-parser');
const sequelize =require('./util/database');
const app = express();
//const user=require('./models/user');
const adminRoutes=require('./routes/admin');
const { where } = require('sequelize');
var cors = require('cors');
app.use(cors());

app.use(bodyParser.json({extended:false}));

app.use(adminRoutes);






sequelize
.sync()
.then(result=>{console.log(result); app.listen(8000);})
.catch(err=> console.log(err));
