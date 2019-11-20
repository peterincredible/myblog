import React from "react";
import axios from "axios";
import validator from "validator";
import {withRouter} from "react-router-dom";
import {add_user_creator} from "../storeandreducer/action_creator";
import {connect} from "react-redux";
import  Header from "./header";
function validate(name,surname,username,email,password,confirm_password){
     let errors ={};
     let isvalidate=true;
     if(name == ""){
         errors.name = "name field empty";
         isvalidate=false;
     }
     if(surname == ""){
         errors.surname = "surname field empty"
         isvalidate=false;
     }
     if(username == ""){
         errors.username ="username field empty";
         isvalidate=false;
     }
     if(password == ""){
          errors.password ="password field empty";
          isvalidate=false;
     }
     if(password != confirm_password){
         errors.password = "password didn't match";
         isvalidate=false;
     }
     if(!validator.isEmail(email)){
         errors.email ="email format not correct";
         isvalidate=false;
     }
     return {errors,isvalidate};
}

class Signup extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            errors:{
                name:"",
                surname:"",
                username:"",
                password:"",
                email:""
        },
            typingtimer:null,
            doneinterval :2000,
            isavailable:""
        }
        this.submit = this.submit.bind(this);
        this.availability = this.availability.bind(this);
        this.mykeyup = this.mykeyup.bind(this);
        this.mykeydown = this.mykeydown.bind(this);
        this.donetyping = this.donetyping.bind(this);
    }
    submit(e){
        e.preventDefault();
        let username = e.target.username.value;
        let password = e.target.password.value;
        let confirm_password = e.target.confirm_password.value;
        let email = e.target.email.value;
        let name = e.target.name.value;
        let surname = e.target.surname.value;
        let {errors,isvalidate} = validate(name,surname,username,email,password,confirm_password)
        this.setState({
            errors
        })
        if(this.state.isavailable == "unavailable"){
            console.log("username already taken");
            return false;
        }

        if(isvalidate){
            //send user registration data to server using axios
            axios.post("/user/api/add-user",{name,username,password,email,surname}).then(data=>{
              return data.data
            }).then(data=>{
                  this.props.add_user_creator(data.token);
                  localStorage.user = data.token;
                  axios.defaults.headers.common["authorization"] = localStorage["user"];
                  this.props.history.push("/");
            }).catch(err=>{
                console.log("an error occured");
            })
        }

 
    }
    componentDidMount(){

    }
    donetyping(){
       let username = document.getElementById('username');
         axios.post("/user/api/get_username",{username:username.value}).then(username=>{
            return username.data
        }).then(data=>{
           console.log(data.data);
           this.setState({
               isavailable:data.data
           })
        }).catch(data=>{
            console.log("an error occured occured trying to get username");
        })
  }
    mykeyup(e){
        clearTimeout(this.state.typingtimer);
        this.setState({
            typingtimer:setTimeout(this.donetyping,this.state.doneinterval)
        })
        
        console.log("keyup worked");
      }
      mykeydown(){
          clearInterval(this.state.typingtimer);
          console.log("keydown worked");
      }
      availability(){
        if(this.state.isavailable == "available"){
          return <span className="text-primary">available</span>
        }else if(this.state.isavailable == "unavailable"){
            return <span className="text-danger">username taken</span>
        }else{
            return <span></span>;
        }
    }
    render(){
       
        return (
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
                            <h2>Register</h2>
                        </div>                    
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-4">
                                <label className="control-label">Name</label>
                            </div>
                            <div className="col-sm-8">
                                <input className="form-control" type="text" name="name"/>
                                {this.state.errors.name && <span className="text-danger">{this.state.errors.name}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-4">
                                <label className="control-label">Surname</label>
                            </div>
                            <div className="col-sm-8">
                                <input className="form-control" type="text" name="surname"/>
                                {this.state.errors.surname && <span className="text-danger">{this.state.errors.surname}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-4">
                                <label className="control-label">Username</label>
                            </div>
                            <div className="col-sm-8">
                                <input className="form-control" type="text" name="username"id="username" onKeyDown={this.mykeydown} onKeyUp={this.mykeyup}/>
                                  {this.availability()}
                                  {this.state.errors.username && <span className="text-danger">{this.state.errors.username}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-4">
                                <label className="control-label">Email</label>
                            </div>
                            <div className="col-sm-8">
                                <input className="form-control" type="email" name="email"/>
                                {this.state.errors.email && <span className="text-danger">{this.state.errors.email}</span>}
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
                                {this.state.errors.password && <span className="text-danger">{this.state.errors.password}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-4">
                                <label className="control-label">Confirm Password</label>
                            </div>
                            <div className="col-sm-8">
                                <input className="form-control" type="password" name="confirm_password"/>
                                {}
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
                     <div className="col-sm-12">
                         {/* this is where the footer will be */}
                     </div>
                </div>
                 
          </div>
           
        )
    }
   
}
export default withRouter(connect(null,{add_user_creator})(Signup));