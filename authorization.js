let jwt_decode = require("jwt-decode");
let User = require("./db/user_db");
async function authorization(req,res,next){
  // console.log(req.headers["authorization"])
    try{
      let admin = jwt_decode(req.headers["authorization"]);
      let user = await User.findOne({username:admin.username});
      if(user.role == "user"){
       return res.status(401).send({error:"sorry you are not authorize to view this page "});
      }
      req.post_creator_id = user._id;
      next();
       
    }catch(err){
      console.log("an error occured in the authorization middleware");
    }
}
module.exports = authorization;