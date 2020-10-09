const express = require("express")
const router = express.Router()
const categoryModel = require("./Category")
const slugify = require("slugify")
router.get("/admin/categories/new",(req,res)=>{

    res.render("admin/categories/new")
})
router.post("/categories/save",(req,res)=>{
    let title= req.body.titulo
    if(title != undefined){
        categoryModel.create({
            title: title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect("/admin/categories/new")
        })
    }else{
        res.redirect("/admin/categories/new")
    }
   
})

router.get("/admin/categories",(req,res)=>{
    categoryModel.findAll().then(categories =>{
        res.render("admin/categories/index",{categories:categories})
    })
    
})
// delete de uma categoria
router.post("/categories/delete",(req,res)=>{
    let id = req.body.id

    if(id != undefined){
        if(!isNaN(id)){
            categoryModel.destroy({
                where:{
                    id: id
                }
            }).then(()=>{
                res.redirect("/admin/categories")
            })
        }else{
            res.redirect("/admin/categories")
        }
    }else{
        res.redirect("/admin/categories")
    }
})


router.get("/admin/categories/edit/:id",(req,res)=>{
    let id = req.params.id
    if(isNaN(id)){
        res.redirect("/admin/categories")
    }
    categoryModel.findByPk(id).then(category=>{
        if(category != undefined){
            res.render("admin/categories/edit",{category:category})

        }
    }).catch(erro=>{
        res.redirect("/admin/categories")
    })
})

router.post("/categories/update",(req,res)=>{
    let id = req.body.id
    let title = req.body.titulo

    categoryModel.update({
        title:title,
        slug: slugify(title)

    },{
      where:{
          id:id
      }  
    }).then(()=>{
        res.redirect("/admin/categories")
    })

    
})



module.exports = router