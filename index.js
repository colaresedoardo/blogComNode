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

// página de início
app.get("/",(req,res)=>{
    articleModel.findAll({
        order:[
            ['id','DESC']

        ]
    }).then(articles=>{
        categoryModel.findAll().then(categories =>{
            res.render("index",{articles:articles,categories:categories})
        })
       
    })

   
    // res.send("bem vindo")
})


app.get("/:slug",(req,res)=>{
   let slug = req.params.slug
   articleModel.findOne({
       where:{
           slug:slug
       }
   }).then(article =>{
       if(article != undefined){
            categoryModel.findAll().then(categories=>{
                res.render("article",{article:article, categories:categories})
            })
            
       }else{
           res.redirect("/")
       }
   }).catch(err=>{
       res.redirect("/")
   })

   
    // res.send("bem vindo")
})

app.get("/category/:slug",(req,res)=>{
    let slug = req.params.slug
    categoryModel.findOne({
        where:{
            slug:slug
        }, include:[{model: articleModel}]
    }).then(category =>{
        if(category!=undefined){
                categoryModel.findAll().then(categories=>{
                    res.render("index",{articles:category.articles, categories:categories})
                })
        }else{

        }
    }).catch(err=>{
        res.redirect("/")
    })

})

app.listen(8000,()=>{
    console.log("Servidor está rondadndo")
})