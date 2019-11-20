let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let schema = new Schema({
    comment:{
        type:String,
        required:true
    },
    user:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"user"
        },
    post:{
        type:String
    },
    parent:{
         type:String
    },
    date:{
        type:String,
        default:" "
    }
    
})

let commentsschema = mongoose.model("comment",schema);
module.exports = commentsschema;