import React from 'react';
import {connect} from 'react-redux';
import {
BrowserRouter as Router,
Switch,
Route,
Redirect
} from "react-router-dom";
import {add_post_creator,add_user_creator} from "./storeandreducer/action_creator";
import Home from "./components/home";
import Signin from "./components/signin";
import Signup from "./components/signup";
import Privateroute  from "./components/private";
import Addpost  from "./components/addpost";
import Postimage  from "./components/postimage";
import Postdetail from "./components/postdetail";
import Editpost from "./components/editpost";
function App(props) {  
  return (
    <Router>
                <Switch>
                    <Redirect exact from="/" to="/home"/>
                    <Route path="/home" component={Home}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/signin" component={Signin}/>
                    <Route path="/postimage/:id" component={Postimage}/>
                  <Privateroute path="/addpost" component={Addpost}/>
                  <Privateroute path="/editpost/:id" component={Editpost}/>
                  <Route path="/postdetails/:id" component={Postdetail}/>
                </Switch>            
    </Router>
  );
}

export default connect(null,{add_post_creator,add_user_creator})(App);
