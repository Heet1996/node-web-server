const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port=process.env.PORT || 4040 ;
var app=express();

app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
var now = new Date().toString();
fs.appendFile('server.log',now+'  '+req.method+'  '+req.url+'\n');
next();
});
// app.use((req,res,next)=>{
//   res.render('maintenance',{
//     pageTitle:"Maintenance"
//   });
//
// });

app.set("view engine","hbs");

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper("getYear",() => {return new Date().getFullYear();});
app.get('/',(req,res)=>
{
  res.render('home.hbs',{
    pageTitle:"Home Page"

  });
}
);
 app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:"About Page"

  });

});
app.get('/project',(req,res)=>
{
  res.render('project.hbs',{
    pageTitle:"Project Page"
  });
});
app.listen(port,()=>{
  console.log(`Server is up for ${port}`);
});
