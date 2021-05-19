const express = require('express');
const bodyParser = require('body-parser');
const articleRouter = require('./routes/articles')
const mongoose = require('mongoose');
const Article =  require('./models/article.js');
const methodOverride = require('method-override');
const dotenv = require('dotenv').config();

mongoose 
 .connect(process.env.MONGO_PROD_URI || uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

const app = express();

app.set('view engine','ejs')
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/',async (req,res)=>{
	const articles = await Article.find().sort({date: 'desc'});
	res.render('index',{articles:articles})
})

app.use('/articles',articleRouter)

app.listen(process.env.PORT||5000);
