import React from "react";
import axios from "axios";
import {add_user_creator} from "../storeandreducer/action_creator";
import {connect} from "react-redux";
import Header from "./header";
import {withRouter} from "react-router-dom";
class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            error:""
        }
        this.submit = this.submit.bind(this);
    }


    submit(e){
        e.preventDefault();
      let username = e.target.username.value;
      let password = e.target.password.value;
      axios.post("/user/api/login_user",{username,password}).then(data=>data.data).then(data=>{
        this.props.add_user_creator(data.token);
        localStorage.user = data.token;
        axios.defaults.headers.common["authorization"] = localStorage["user"];
        this.props.history.push("/");
      }).catch(err=>{
          if(err.response){
            let error = err.response.data.error
            this.setState({error});
          }
       
      })
    }

    render(){
       
        return(
            <div className="container-fluid">
            <div className="row">
                 <div className="col-sm-12">
                     <Header/>
                 </div>
             </div>
            <div className="row">
            <div className="col-sm-6 col-sm-offset-6">
            <form className="form form-horizontal" action="" method="post" onSubmit={this.submit}>
                <div className="row">
                    <div className="col-sm-8 col-sm-offset-4" style={{padding:"0px"}}>
                        {this.state.error && <h3 className="bg-danger">{this.state.error}</h3>}
                        <h2>Sign In</h2>
                    </div>                    
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-4">
                            <label className="control-label">Username</label>
                        </div>
                        <div className="col-sm-8">
                            <input className="form-control" type="text" name="username"/>
                        </div>
                    </div>
                </div>
             
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-4">
                            <label className="control-label">Password</label>
                        </div>
                        <div className="col-sm-8">
                            <input className="form-control" type="password" name="password"/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-8 col-sm-offset-4">
                            <button className="btn btn-danger">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
            </div>
            </div>
            <div className="row">
               {/* this is where the footer will be  */}
            </div>
        </div>
            
        )
    } 
}

export default withRouter(connect(null,{add_user_creator})(Login));