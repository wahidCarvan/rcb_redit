// adding our dependicies
var express = require('express');
var bodyParser = require('body-parser');
var handlebars =require('express-handlebars');
var Posts = require('./models')['Posts'];
Posts.sync();
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
//home page
app.get('/', function(req,res){
  // calling our post variable
  Posts.findAll({}).then(function(result){
    console.log('result')
    return res.render('index',{
      posts:result
    });

  });
  // rendering the handlebars page
res.render('index');
});
//form page gets the post
app.get('/new-post',function(req,res){
  //name of file
  res.render('new');
});
// posts the post
app.post('/new-post',function(req,res){
  var body =req.body;
  Posts.create({
    title:body.title,
    url:body.url,
    image:body.image,
    score:0,
    description:body.description
  }).then(function(data){
    console.log(data);
  })
  // create the post in the database

  //redirect to the posts:id page
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