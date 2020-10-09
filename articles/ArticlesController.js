const express = require("express")
const router = express.Router()
const categoryModel = require("../categories/Category")
const article = require("./Article")
const slugify = require("slugify")

router.get("/admin/articles",(req,res)=>{
    // incluindo a categoria junto no retorno
    article.findAll({
                include: [{model: categoryModel}]}
    ).then(articles=>{
      
        res.render("admin/articles/index",{articles:articles})
    })

    
})


router.get("/admin/articles/new",(req,res)=>{
    
    categoryModel.findAll().then(categories =>{
        res.render("admin/articles/new",{categories: categories})
    })
})


router.post("/articles/save",(req,res)=>{
    let title = req.body.titleArticle
    let body = req.body.body
    let idCategory = req.body.category
    console.log(idCategory)
    
   
    article.create({
        title:title,
        slug: slugify(title),
        body:body,
        categoryId: idCategory
    }).then(()=>{
        res.redirect("/admin/articles")
    })
})


router.post("/articles/delete",(req,res)=>{
    let id = req.body.id

    if(id != undefined){
        if(!isNaN(id)){
            article.destroy({
                where:{
                    id: id
                }
            }).then(()=>{
                res.redirect("/admin/articles")
            })
        }else{
            res.redirect("/admin/articles")
        }
    }else{
        res.redirect("/admin/articles")
    }
})
module.exports = router