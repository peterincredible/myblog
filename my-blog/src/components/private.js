import React from "react";
import {withRouter,Route,Redirect} from "react-router-dom";



function Privateroute({component:Component,...rest}){
    let user;
      if(localStorage.user){
         user = localStorage.user;
      }
     return(
           <Route {...rest} render={()=>(user? <Component {...rest} />: <Redirect to="/signup" {...rest}/>)}/>
     )
}

export default withRouter(Privateroute);