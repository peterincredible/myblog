import React from "react";
import {NavLink,withRouter} from "react-router-dom";
import axios from "axios";
import {get_posts_creator,remove_all_posts_creator} from "../storeandreducer/action_creator";
import {connect} from "react-redux";
class Postlist extends React.Component{
    constructor(props){
        super(props)
        this.state={
            posts:[],
            count:0
        }
    }
async componentDidMount(){
    let data = await axios.get("/admin/api/all-post");
    
    if(this.state.count == 0){
        this.props.get_posts_creator(data.data.post);
        this.setState({
           posts:[...this.props.post]
       })
       this.setState({count:1})
    }  
    console.log(this.state.posts)
}
async componentWillUnmount(){
    this.props.remove_all_posts_creator();
}
    render(){
        return (
               this.state.posts.map((data)=>(
                <div className="row well rm-padding-tb rm-padding-lr" key={`${data._id}`} style={{marginBottom:"10px"}}>
                     <div className="col-sm-6 rm-padding-lr">
                    
                     <img src={`/images/${data._id}/${data.image}`} className="img-responsive" style={{width:"100%",height:"200px"}}/>
                    </div>
                    <div className="col-sm-6" style={{paddingBottom:"10px"}}>
                         <h3>{data.title}</h3>
                         <p>{data.user && data.user.username} {data.date}</p>
                           <NavLink className="btn btn-primary" to={`/postdetails/${data._id}`}>Read More</NavLink>
                    </div>
                </div>
               ))
                
        )
    }
}
let mapstatetoprops = function({post}){
    return {post}
}
export default connect(mapstatetoprops,{get_posts_creator,remove_all_posts_creator})(Postlist); 