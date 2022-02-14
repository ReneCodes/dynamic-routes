//Node built-in packages
const path = require("path");

//Third party packages
const express = require("express");

//own packages
const defaultRoutes = require('./routes/default');
const restaurantRoutes = require('./routes/restaurant');

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use('/', defaultRoutes); //with .use every incoming request starting with / will be be funneled to default.js and checked. If nothing matches it continues searching through app.js
app.use('/', restaurantRoutes);


//fallback catch all 'wrong' routes
//use of middleware at the end of logic

app.use(function(reg, res){
  res.status(404).render('404');
})

//Fallback Server Error
//error which occours on serverside only

app.use(function(error, req,res, next){
  res.status(500).render('500');
})


app.listen(3000);
