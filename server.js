const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const logger = require('morgan');
const cors = require('cors');

const passport = require('passport');

const usersRoutes=require('./routes/userRoutes');
const multer = require('multer');

const port = process.env.PORT||3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}  ));

app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by');


app.set('port',port);

const upload = multer({
    storage:multer.memoryStorage()
})

usersRoutes(app,upload);

server.listen(3000,'192.168.1.44'||'localhost',function(){
    console.log("App de NodeJs "+process.pid+" Iniciada........")
});


//creando rutas
app.get('/',(req,res)=>{
    res.send('Ruta raíz del backend');
});

app.get('/test',(req,res)=>{
    res.send("Esta es la ruta test");
})

//manejo de errores
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.status||500).send(err.stack);
});



