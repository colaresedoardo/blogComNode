const Sequelize = require("sequelize")
const connection = require("../database/database")
const Category = require('../categories/Category')
const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug:{
        type: Sequelize.STRING,
        allowNull:false
    },body:{
        type: Sequelize.TEXT,
        allowNull:false
    }
})
// categoria tem muitos artigos
Category.hasMany(Article)
// 1 para 1
Article.belongsTo(Category)
// Article.sync({force:true}) -> sincroniza com o banco de dados
module.exports =Article