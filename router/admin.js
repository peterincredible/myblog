let router = require("express").Router();
let Post = require("../db/post_db");
let multer  = require('multer');
let Moment = require("moment");
let authorization = require("../authorization");
let storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, 'uploads/')
   },
   filename: function (req, file, cb) {
     cb(null, file.originalname)
   }
 })
let upload = multer({storage});
let fs = require('fs-extra');
router.get("/get-post/:id",async(req,res)=>{
  try{
      post = await Post.findById(req.params.id).populate("user");
         res.send({post});
  }catch(err){
    console.log("an error occured getting all post");
  }
});
router.get("/all-post",async(req,res)=>{
  try{
      post = await Post.find({}).populate("user");
         res.send({post});
  }catch(err){
    console.log("an error occured getting all post");
  }
});

router.post("/add-post",authorization,async(req,res)=>{
   try{
          console.log(req.body.title);
         let newpost = new Post(req.body);
          newpost.date = Moment().format("L");
          newpost.user = req.post_creator_id;
          await newpost.save();
          res.send({id:newpost._id});
    
   }catch(err){
        res.status(400).send({error:"couldn't add your new post"});
   }
}
);
router.post("/add-post-image/:id",authorization,upload.single("file"),async(req,res)=>{
   try{
         let post = await Post.findById(req.params.id);
          post.image = req.file.filename;
          await post.save();
         await fs.move(`uploads/${req.file.filename}`,`public/images/${req.params.id}/${req.file.filename}`);
         res.send("success");
    
   }catch(err){
        res.status(400).send({error:"couldn't add your new post image"});
   }
}
);

module.exports = router;