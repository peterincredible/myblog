import React from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";


function Commentform(props) {

    let submit= async (e)=>{
        e.preventDefault();
        try{
            let comment = document.getElementById("comment-reply").value;
              if (comment == ""){
                  return props.toggler();
              }
            let post = props.comment_data.post;
            let parent= props.comment_data.id;
            let user =  jwt_decode(localStorage["user"])._id;
           console.log(post,parent,user);
             let data = await axios.post("/user/api/add-comment",{comment,post,parent,user})
             props.update_comment(data);

            props.toggler();
        }catch(err){
             console.log("an error occured at the commentform submit event handler");
        }
        
    }
    return(
             <div className="row" style={{marginTop:"10px"}} >
                 <div className="col-sm-12">
                      <form onSubmit={submit}>
                          <div className="form-group">
                             <textarea rows="12" cols="12" id="comment-reply" className="form-control" placeholder="write your comment"/>
                          </div>
                          <div className="form-group">
                                <input type="submit"  className="btn btn-primary" value="submit"/>
                          </div>
                      </form>
                 </div>
             </div>
        
        
        
    )
}

export default Commentform