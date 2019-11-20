let express = require("express");
let mongoose = require("mongoose");
let bodyparser = require('body-parser');
let app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
let userrouter = require("./router/user");
let postrouter = require("./router/admin");
app.use(express.static(__dirname+"/public"));
app.use("/user/api",userrouter);
app.use("/admin/api",postrouter);
let port = process.env.PORT || 5000;
mongoose.connect('mongodb://localhost/react-blog', {useNewUrlParser: true});
mongoose.connection.once("open",()=>{
    console.log("the database is open and working perfectly");
})


app.listen(port,()=>{
    console.log("server is listening to port ", port);
});