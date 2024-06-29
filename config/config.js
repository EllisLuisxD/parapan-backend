const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'bspgubhn8wjnxbva6j8d-mysql.services.clever-cloud.com',
    port : 3306,
    user: 'u3yhsqsow1d97jfu',
    password: 'eG2uTrFY3uAig4qIzIEo',
    database: 'bspgubhn8wjnxbva6j8d'
})

db.connect(function (err){
    if(err)throw err;
    console.log('DATABASE CONNECTED');
});

module.exports=db;
