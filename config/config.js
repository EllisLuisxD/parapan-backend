const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'bspgubhn8wjnxbva6j8d-mysql.services.clever-cloud.com',
    user: 'u3yhsqsow1d97jfu',
    password: 'u3yhsqsow1d97jfu',
    database: 'bspgubhn8wjnxbva6j8d'
})

db.connect(function (err){
    if(err)throw err;
    console.log('DATABASE CONNECTED');
});

module.exports=db;