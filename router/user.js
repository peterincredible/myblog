let router = require("express").Router();
let User = require("../db/user_db");
let Comments = require("../db/comments_db");
let jwt = require("jsonwebtoken");
let moment = require("moment");
router.post("/get_username",async(req,res)=>{
   try{
         console.log(req.body.username);
      let username = await User.findOne({username:req.body.username});
        if(username){
              res.send({data:"unavailable"})
        }else{
              res.send({data:"available"});
        }
       
   }catch(err){
       console.log("an error occured")
   }
}
);
router.post("/login_user",async(req,res)=>{
    
     try{
            let user = await User.findOne({username:req.body.username});
            if(user.passwordMatch(req.body.password)){
                  console.log(user.passwordMatch(req.body.password));
                  let {name,username,email,role,_id} = user;
                  let data =jwt.sign({name,username,email,role,_id},"secret");
                  res.json({token:data});
              }else{
                  console.log("password isnt correct");
                  res.status(400).json({error:"wrong password or username"});
             }     
            
      }catch(err){
            console.log("server error")
          res.status(400).send({error:"invalid username"});
          
      }
});
router.post("/add-user",async(req,res)=>{
      try{
            let user = new User(req.body);
             await user.save();
             let {name,username,email,role,_id} = user;
             console.log(_id);
             let data =jwt.sign({name,username,email,role,_id},"secret");
             console.log("/add-user saved data"+req.body.username);
             return res.json({token:data});
            
      }catch(err){
            console.log("server adduser error")
          res.send("an error adduser occured")
          
      }
})
router.get("/remove-user/:id",async(req,res)=>{
      try{
           await User.findByIdAndRemove(req.params.id)
            res.json({token:"it worked"});
            
      }catch(err){
            console.log("server remove user error")
          res.status(401).send("an error remove user occured")
          
      }
})
router.post("/add-comment",async(req,res)=>{
      try{
             let comment = new Comments(req.body);
             comment.date = moment().format("L");
             comment = await comment.save();
            comment = await Comments.findById(comment._id).populate("user");
             res.send({comment});
            
      }catch(err){
          res.status(401).send({error:"maintainance going on the server just be patient"});
      }
})
router.get("/all-comment/:id",async(req,res)=>{
      try{
            let comments = await Comments.find({post:req.params.id}).populate("user");
            console.log(comments);
             res.send({comments});
      }catch(err){
            console.log("an error occured in the all-comment route");
      }
     
})
module.exports = router;