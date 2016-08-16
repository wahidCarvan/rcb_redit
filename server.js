// adding our dependicies
var express = require('express');
var bodyParser = require('body-parser');
var handlebars =require('express-handlebars');
// creates the express server
var app = express();
// adding our public folder
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
  extended:false
}));
app.engine('handlebars',handlebars({
defaultLayout:'main'
}));
app.set('view engine', 'handlebars');
// we need 3 routes the home page submit page and the actual post page
app.get('/', function(req,res){
  // rendering the handlebars page
res.render('index');
});
//second router
app.get('/new-post',function(req,res){
  //name of file
  res.render('new');
});
//third route
app.get('/posts/:id', function(req,res){
  // name of file
  res.render('post');
})
var port =process.env.PORT ||3000;
app.listen(port, function(){
  console.log('connected to', port);
});