const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")

const categoriesController = require("./categories/CategoriesController")
const articlesController = require("./articles/ArticlesController")

const articleModel= require("./articles/Article")
const categoryModel= require("./categories/Category")

app.set('view engine', 'ejs')

//arquivos staticos
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//database
connection.authenticate().then(()=>{
    console.log("conexao feita com sucesso")
}).catch((error)=>{
    console.log(error)
})

app.use("/", articlesController)
app.use("/", categoriesController)
app.get("/",(req,res)=>{
    res.render("index")
    // res.send("bem vindo")
})



app.listen(8000,()=>{
    console.log("Servidor está rondadndo")
})