import {NavLink} from "react-router-dom"
import React from "react";
import {withRouter} from "react-router-dom";
import jwt_decode from "jwt-decode";
import {connect} from "react-redux";
import {remove_user_creator} from "../storeandreducer/action_creator";
class Header extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user:{name:"",username:"",email:"",role:""}
        }
        this.signout = this.signout.bind(this);
        this.role = this.role.bind(this);
    }
    componentDidMount(){
        if(localStorage["user"]){
            const {name,username,email,role} = jwt_decode(localStorage["user"]);
            console.log(role);
            this.setState({
                 user:{name,username,email,role}
             })
        }
        
      
       
     
    }
    role(){
         if(!this.state.user.role){
             return false;
         }
         if(this.state.user.role =="user" ){
             return false;
         }
         return true;
    }
    signout(e){
        e.preventDefault();
        delete localStorage["user"];
        this.props.remove_user_creator();
        this.props.history.push("/");
    }
    render(){
        return(
       
            <nav className="navbar navbar-default" style={{paddingLeft:"3px",paddingRight:"3px"}}>
                 <div className="container-fluid">
                         <div className="navbar-header">
                             <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                 <span className="sr-only">Toggle navigation</span>
                                 <span className="icon-bar"></span>
                                 <span className="icon-bar"></span>
                                 <span className="icon-bar"></span>
                             </button>
                             <NavLink className="navbar-brand" to="/home">Home</NavLink>
                         </div>
                         <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                             <ul className="nav navbar-nav navbar-right">
                                  {this.state.user.username?<li className="text-center"><NavLink to="#" onClick={this.signout}>Singout({this.state.user.username})</NavLink></li>:<li className="text-center"><NavLink to="/signin">Singin</NavLink></li>}
                                  <li className="text-center">{!this.state.user.name &&<NavLink to="/signup">Signup</NavLink>}</li> 
                                 {this.role() && <li className="text-center"><NavLink to="/addpost">Addpost</NavLink></li> }

                                 
                             </ul>
                         </div>
                 </div>
                 
             </nav>
     
    )
    }
 
}

export default withRouter(connect(null,{remove_user_creator})(Header));