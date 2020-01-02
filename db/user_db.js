let mongoose = require("mongoose");
let bcrypt = require("bcryptjs");
let Schema = mongoose.Schema;
let userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    surname:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:""
    },
    role:{
        type:String,
        default:"user"
    }
});
userSchema.pre("save",function(){
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password,salt);
})
userSchema.methods.passwordMatch = function(password){
    return bcrypt.compareSync(password,this.password);
}
module.exports = mongoose.model("user",userSchema);