const express = require("express");
const user_route = express();
const session = require("express-session");

const configfile = require("../../configfile/configfile.js");

user_route.use(session({secret:configfile.sessionSecret}));

const auth = require("../../middleware/auth");


user_route.set('view engine','hbs');
user_route.set('views','./templates/views');

const bodyParser = require('body-parser');
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}))

const path = require("path");
const multer = require("multer");
user_route.use(express.static('public'));

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../../public/userimg'))
    },
    filename:function(req,file,cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name);
    }
});

const upload = multer({storage:storage})

const userController = require("./regCon");
const { config } = require("process");

user_route.get('/register',auth.isLogout,userController.loadRegister);

user_route.get('/login',auth.isLogout,userController.loginLoad);

user_route.post('/register',upload.single('image'),userController.insertUser);

user_route.post('/login',userController.verifyLogin);

user_route.get('/recommendator',auth.isLogin,userController.recommendatorLoad);

user_route.get('/logout',auth.isLogin,userController.userLogout);

module.exports= user_route;