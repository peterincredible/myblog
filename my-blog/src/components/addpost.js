import React from "react";
import {connect} from "react-redux";
import axios from "axios";
import Header from "./header";
import Footer from "./footer";
function validate(title,content){
    let isvalidate = true;
    let errors ={};
    if(title == ""){
         errors.title ="title is empty";
         isvalidate = false;
    }
    if(content == ""){
        errors.content ="content is empty";
        isvalidate = false;
    }
    return {errors,isvalidate};


}

class Addpost extends React.Component{
    constructor(props){
        super(props)
        this.submit = this.submit.bind(this);
        this.state = {
            errors:{
                title:"",
                content:""
            }
        }
    }
    submit(e){
        e.preventDefault();
        let posttitle = e.target.title.value;
        let postcontent = e.target.content.value;
        let {errors,isvalidate} = validate(posttitle,postcontent);
        if(isvalidate){
            axios.post("/admin/api/add-post",{title:posttitle,content:postcontent}).then(data=>{
                this.props.history.push(`/postimage/${data.data.id}`);

            }).catch(err=>{
                console.log("an error occured in the addpost page");
            })
        }else{
            this.setState({errors});
        }

        return;
    }

    render(){
        return(
                <div className="container-fluid flex-container">
                    <div className="row">
                        <div className="col-md-12">
                            <Header/>
                        </div>
                        
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-3">
                            <form className="form" action="" method="POST" onSubmit={this.submit}>
                                <div className="form-group">
                                    <label className="control-label" >Post Title</label>
                                        <input className="form-control"type="text" name="title"/>
                                        {this.state.errors.title && <span className="text-danger">no post title</span>}
                                </div>
                                <div className="form-group">
                                    <label className="control-label" >Post content</label>
                                        <textarea className="form-control" rows="15" name="content"/>
                                        {this.state.errors.content && <span className="text-danger">no post content</span>}
                                </div>
                                <div className="form-group">
                                        <input type="submit" value="Submit" className="btn btn-danger"/>
                                </div>

                            </form>
                        </div>
                    </div>
                    <div className="row flex-footer">
                        <div className="col-md-12">
                             <Footer/>
                        </div>
                        
                    </div>
                </div>
        )
    }
}

export default connect(null)(Addpost);