const userControllers = require('../controllers/userControllers');
const usersController=require('../controllers/userControllers');

module.exports=(app,upload)=>{
    //get -- obtener datos
    //post -- almacenar datos
    //put -- actualizar datos
    //delete -- eliminar datos
    app.post('/api/users/create',usersController.register);
    app.post('/api/users/createWithImage',upload.array('image',1),usersController.registerWithImage);
    app.post('/api/users/login',usersController.login);
}