import React from "react";
import axios from "axios";
import Header from "./header";
import jwt_decode from "jwt-decode";
import Comments from "./comment";
import Footer from "./footer"
import { runInThisContext } from "vm";

class Postdetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:null,
            post:{
                id:"",
                title:"",
                content:"",
                image:"",
                date:"",
                user:{}

            },
            tempcomments:[],
            comments:[],
            comment_count:0
        }
        this.submit = this.submit.bind(this);
        this.flattonest = this.flattonest.bind(this);
        this.update_comment = this.update_comment.bind(this);
    }
    //this is the function that converts a flat array to a nested array base on the parent id;
   flattonest(arr,parent = {_id:this.props.match.params.id}){
        let children = [];
       for(let i = 0; i < arr.length; i++){
           let grandchildren;
              if(arr[i].parent == parent._id){
                grandchildren = this.flattonest(arr,{_id:arr[i]._id});
                if(grandchildren.length){
                  arr[i].children = grandchildren;
              }
              children.push(arr[i]);
              }

             
       }
       return children;
  }
  //this the comment that update the comment array
  update_comment(data){
       let temp = data.data.comment;
      this.setState((state)=>{
          return {tempcomments:[...state.tempcomments,temp]}
      });


      this.setState({
          comments:this.flattonest(this.state.tempcomments),
          comment_count:this.state.tempcomments.length

    });
  }
  //this is the component did mount function defination start
    async componentDidMount(){
        try{
            
            let post = await axios.get(`/admin/api/get-post/${this.props.match.params.id}`);
            let comments = await axios.get(`/user/api/all-comment/${this.props.match.params.id}`);
            this.setState({post:{
                id:post.data.post._id,
                title:post.data.post.title,
                image:post.data.post.image,
                content:post.data.post.content,
                date:post.data.post.date,
                user:post.data.post.user

            },
            
            tempcomments:comments.data.comments,
            comments: this.flattonest(comments.data.comments),
            comment_count:comments.data.comments.length
        });
        console.log(this.state.post.user.username)
        if(localStorage["user"]){
            this.setState({user:jwt_decode(localStorage["user"])});
        }
        
        
        }catch(err){

        }
       
    }
    //this is the end of the definition the componentdidmount
    //this is the start of the submit event handler
 async submit(e){
      try{
        let{_id} = jwt_decode(localStorage["user"]);//this get the user id
     let comment = document.getElementById("comment_text").value;
       if(comment == "")return//if the user didn;t type anything but click on the submit button it should do nothing
        let data = await axios.post(`/user/api/add-comment`,{comment,parent:this.props.match.params.id,user:_id,post:this.props.match.params.id});
           this.update_comment(data);
      }catch(error){
        console.log("the sumbit button was clicked and there was an error"); 
      }
  
 }
 //this is the end of the submit event handler
    render(){
        return(
                <div className="container-fluid flex-container">
                    <div className="row flex-header">
                        <div className="col-sm-12" style={{paddingLeft:0,paddingRight:0}}>
                            <Header/>
                        </div>
                    </div>
                    <div className="row flex-body">
                        <div className="col-sm-8 col-sm-offset-2" style={{paddingLeft:0,paddingRight:0}}>
                            <div className="row">
                                <div className="col-sm-10 col-sm-offset-1">
                                     <h1 style={{textAlign:"center"}}>{this.state.post.title}</h1>
                                     <p style={{textAlign:"center"}}>{this.state.post.user && this.state.post.user.username} {this.state.post.date}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6 col-sm-offset-3" >
                                    <img src={`/images/${this.state.post.id}/${this.state.post.image}`} className="img-responsive"style={{width:"100%",height:"200px"}} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-10 col-sm-offset-1" style={{paddingLeft:0,paddingRight:0}}>
                                   <p className="text-justify">{this.state.post.content}</p>
                                </div>
                            </div>
                            <div className="row">
                                {
                                this.state.user &&
                                <div className="col-sm-10 col-sm-offset-1">
                                    <div>
                                        <div className="form-group">
                                            <textarea placeholder="leave a comment" className="form-control" rows="12" cols="12" id="comment_text"/>
                                        </div>
                                        <div className="form-group">
                                        <input type="submit" className="btn btn-primary" value="Submit" onClick={this.submit}/>
                                        </div>
                                    </div>

                                </div>
                            }
                                <div className="col-sm-10 col-sm-offset-1">
                                <p><b>Comments ({this.state.comment_count})</b></p>
                                    {this.state.comments.map((comment,index)=><Comments comment={comment} key={index} mystyle={0} update_comment={this.update_comment}/>)}
                                </div>
                            </div>
                             
                           
                             
                        </div>
                    </div>
                    <div className="row flex-footer" style={{padding:"0"}}>
                           <Footer/>
                    </div>

                </div>
        )
    }
}
export default Postdetails;