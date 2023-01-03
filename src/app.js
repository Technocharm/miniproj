const express = require("express")
const path = require("path")
const app = express()
const hbs = require("hbs")
const { userInfo } = require("os")
require("./db/conn")

const port = process.env.PORT || 3000

const static_path = path.join(__dirname,"../public")
const template_path = path.join(__dirname,"../templates/views")
const partial_path = path.join(__dirname,"../templates/partials")
const modal_path = path.join(__dirname,"../src/models")
const img_path = path.join(__dirname,"../img")
const auth = require("../middleware/auth");

console.log(path.join(__dirname))
app.use(express.static(static_path))
app.use('/js',express.static(modal_path))
app.use('/image',express.static(img_path))
app.set("view engine","hbs")
app.set("views",template_path)
hbs.registerPartials(partial_path)

app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/index",(req,res)=>{
    res.render("index")
})

app.get(".register",(req,res)=>{
    res.render("register")
})

const userRoute = require('./models/regroute');
app.use('/',userRoute)

app.get("/register",auth.isLogin,(req,res)=>{
    res.render("register")
})

app.get("/recommendator",auth.isLogin,(req,res)=>{
    res.render("recommendator")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/allmov",(req,res)=>{
    res.render("allmov")
})

app.get("/home",(req,res)=>{
    res.render("home")
})

app.get("/watchlist",(req,res)=>{
    res.render("watchlist")
})

app.get("/movwin",(req,res)=>{
    res.render("movwin")
})

app.get("/cust",(req,res)=>{
    res.render("cust")
})

app.get("/anime",(req,res)=>{
    res.render("anime")
})

app.get("/series",(req,res)=>{
    res.render("series")
})

app.get("/shortfilm",(req,res)=>{
    res.render("shortfilm")
})

app.listen(port,()=>{
    console.log("running")
})
