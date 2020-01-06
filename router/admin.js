let router = require("express").Router();
let Post = require("../db/post_db");
let Comments = require("../db/comments_db");
let multer  = require('multer');
let Moment = require("moment");
let authorization = require("../authorization");
let cloudinary = require('cloudinary');
let cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: "dflyjffzr",
  api_key: "879813996966535",
  api_secret: "_LoL49Uy7kWXF823GiYUgZb18co"
});
let storage = cloudinaryStorage({
  cloudinary,
  folder: 'blog-images',
  allowedFormats: ['jpg', 'png'],
});
let upload = multer({storage});
let fs = require('fs-extra');
router.get("/get-post/:id",async(req,res)=>{
  console.log(req.params.id)
  try{
      post = await Post.findById(req.params.id).populate("user");
         res.send({post});
  }catch(err){
    console.log("an error occured getting all post");
  }
});
router.post("/edit-post/:id",async(req,res)=>{
  console.log(req.params.id)
  try{
      post = await Post.findByIdAndUpdate(req.params.id,{...req.body});
         res.send({message:"edited successfully"});
  }catch(err){
    console.log("an error occured edit post");
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
router.get("/delete-post/:id",authorization,async(req,res)=>{
  try{
        let post_to_delete = await Post.findById(req.params.id);
         
        await Comments.deleteMany({post:req.params.id});
        
         cloudinary.v2.uploader.destroy(post_to_delete.image_id,function(err){
           if(err){
             console.log("there was an error deleting file from cloudnary")
           }
           else{
             console.log("file successfully deleted");
           }
         })
         post_to_delete.remove();
         res.send({message:"post deleted successfully"});
   
  }catch(err){
       res.status(400).send({error:"couldn't add your new post"});
  }
}
);
router.post("/add-post-image/:id",authorization,upload.single("file"),async(req,res)=>{
   try{
         let post = await Post.findById(req.params.id);
         if(post.image_id !=""){
          cloudinary.v2.uploader.destroy(post.image_id,function(err){
            if(err){
              console.log("there was an error deleting file from cloudnary")
            }
            else{
              console.log("file successfully deleted");
            }
          })
         }
          post.image = req.file.url;
          post.image_id = req.file.public_id;
          await post.save();
         res.send("success");
    
   }catch(err){
        res.status(400).send({error:"couldn't add your new post image"});
   }
}
);

module.exports = router;