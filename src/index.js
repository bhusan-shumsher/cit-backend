const http = require('http');
const express = require('express');
const {json} = require('body-parser');
const mongoose = require('mongoose');
const serveIndex = require('serve-index');
const multer = require('multer'); // for file upload 
// const keys = require('./keys');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const resultRoutes = require('./routes/result');
const departmentRoutes = require('./routes/department');
const admintRoutes = require('./routes/admin');
const accountRoutes = require('./routes/account');
const ftpRoutes = require('./routes/ftp');
const fileStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'src/files');
    },
    filename: (req,file,cb)=>{
        cb(null,file.originalname);
    }
})
const app = express();
app.use(json());
app.use(multer({
    storage: fileStorage
}).single('file'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use(authRoutes);
app.use(studentRoutes);
app.use(resultRoutes);
app.use(departmentRoutes);
app.use(admintRoutes);
app.use(accountRoutes);
// app.use('/api/show-forms',express.static('src/submitted-form'),serveIndex('src/submitted-form',{icons: true}));
// app.use(express.static('public'));
app.use(ftpRoutes);

const start = async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:2717/auth');
        console.log('database connected');
    }catch(err){
        console.log(err);
    }
    app.listen(3000,()=>{
        console.log('running on 3000');
    })
}


start();

