let express = require("express");
let mongoose = require("mongoose");
let bodyparser = require('body-parser');
let app = express();
let path = require("path")
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
let userrouter = require("./router/user");
let postrouter = require("./router/admin");
app.use(express.static(__dirname+"/public"));
app.use("/user/api",userrouter);
app.use("/admin/api",postrouter);

 if(process.env.NODE_ENV == "production"){
     mongoose.connect('mongodb://peterincredible:omolola-93@ds259528.mlab.com:59528/heroku_3mn5n4k7', {useNewUrlParser: true});
     app.use(express.static("my-blog/build"));
     app.get("*",(req,res)=>{
         res.sendFile(path.resolve(__dirname,"my-blog","build","index.html"))
     })
 }
 else{
    mongoose.connect('mongodb://localhost/react-blog', {useNewUrlParser: true});
 }
 mongoose.connection.once("open",()=>{
    console.log("the database is open andddd working perfectly");
})
 let port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log("server is listening kkkjjjj to port ", port);
});