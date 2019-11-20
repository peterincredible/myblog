import React from "react";
import Commentform from "./commentform";
import axios from "axios";
import jwt_decode from "jwt-decode";


class Comments extends React.Component{
   constructor(props){
        super(props)
           this.state = {
               acctuser:null,
               comment:"",
               user:"",
               post:"",
               id:"",
               toggle:false
           }
           this.toggler = this.toggler.bind(this);
    }
    componentDidMount(){
        this.setState({
            comment:this.props.comment.comment,
            user:this.props.comment.user.username,
            post:this.props.comment.post,
            id: this.props.comment._id,
            date:this.props.comment.date
        });
        if(localStorage["user"]){
            this.setState({acctuser:jwt_decode(localStorage["user"])});
        }
        
    }
    toggler(){
        this.setState({toggle:!this.state.toggle});
    }

    render(){
        return(
            <div style={{paddingLeft:`${this.props.mystyle}px`}}>
                <div className="well">
                    <div className="row">
                        <div className="col-sm-10">
                            <p>{this.state.user}  {this.state.date}</p>
                            <p>{this.state.comment}</p>
                        </div>
                        <div className="col-sm-2">
                            {this.state.acctuser && <button className="btn btn-default" onClick={this.toggler}>reply</button>}
                        </div>
                    </div>
                     
                </div>
                {this.state.toggle && <Commentform toggler={this.toggler} comment_data={{id:this.state.id,post:this.state.post}} update_comment={this.props.update_comment}/>}
               
                 {this.props.comment.children && this.props.comment.children.map((comment,index)=><Comments comment={comment} key={index}  mystyle={this.props.mystyle + 15} update_comment={this.props.update_comment}/> )}
            </div>
        )
    }
}

export default Comments;