const user = require('./registerSchema');
const bcrypt = require('bcrypt');

const securePassword = async(password) => {
    try {
        const passhash = await bcrypt.hash(password,10);
        return passhash; 

    } catch (error) {
        console.log(error.message);
    }
}

const loadRegister = async(req,res) => {
    try{
        res.render('register');
    }catch(error){
        console.log(error.message);
    }
}

const insertUser = async(req,res)=>{
    try {
        const spass = await securePassword(req.body.password);
        const User = new user({
            name:req.body.name,
            age:req.body.age,
            email:req.body.email,
            password:spass,
            image:req.file.filename,
        });

        const userData = await User.save();

        if(userData){
            res.render('register',{message:"Successfully Signed Up"});
        }else{
            res.render('register',{message:"failed signup"})
        }

    } catch (error) {
        console.log(error.message);
    }
}


const loginLoad = async(req,res) => {
    try {
        res.render('login');
    } catch (error) {
        console.log(error.message);        
    }
}


const verifyLogin = async(req,res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;

        const userData = await user.findOne({email:email});
        console.log(email);
        
        if(userData){

            const passwordMatch = await bcrypt.compare(password,userData.password);
            console.log(passwordMatch);
            if(passwordMatch){
                req.session.user_id = userData._id;
                res.redirect('/recommendator');
            }else{
                res.render('login',{message:"Email and password is incorrect"});
            }

        }else{
            res.render('login',{message:"Email and password is incorrect"});
        }

    } catch (error) {
        console.log(error.message);
        
    }
}

const recommendatorLoad = async(req,res) => {
    try {
        const userData = await user.findById({ _id:req.session.user_id });
        res.render('recommendator',{User:userData});
    } catch (error) {
        console.log(error.message);        
    }
}

const userLogout = async(req,res) => {
    try{
        req.session.destroy();
        res.redirect('login');

    }catch(error){
        console.log(error.message);
    }
}

module.exports = {
    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    recommendatorLoad,
    userLogout
}