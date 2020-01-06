let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let schema = new Schema({
    date:{
        type:String
    },
    title:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    image_id:{
        type:String
    },
    content:{
        type:String,
        required:true
    },
     user:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"user"
    },
})

let postschema = mongoose.model("post",schema);
module.exports = postschema;