import React from "react";
import Header from "./header";
import {add_user_creator} from "../storeandreducer/action_creator";
import {connect} from "react-redux";
import axios from "axios";
import Footer from "./footer";

import Postlist from "./postlist";
 class Home extends React.Component{
 constructor (props){
   super(props);  
 }
 async componentDidMount(){
  if(localStorage["user"]){
     axios.defaults.headers.common["authorization"] = localStorage["user"];
    this.props.add_user_creator(localStorage["user"]);
  }

 }
 render(){
       return (
           <div className="container-fluid flex-container">
              <div className="row rm-padding-lr">
                  <div className="col-sm-12 rm-padding-lr">
                     <Header/>
                  </div>
              </div>
              <div className="row">
                <div className="col-sm-6 col-sm-offset-3">
                      <Postlist/>
                </div>
              </div>
              <div className="row flex-footer rm-padding-lr">
                           <Footer/>
                    </div>
             </div>   
          )
 }
   
}

export default connect(null,{add_user_creator})(Home);