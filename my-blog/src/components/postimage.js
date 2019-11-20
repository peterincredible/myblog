import React from "react";
import axios from "axios";
import Header from "./header";
import  FormData from  "form-data";

export class Postimage extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            imagefile:"",
            loaded:0
        }
  this.filechanged = this.filechanged.bind(this);
  this.mysubmit = this.mysubmit.bind(this);
    }
   
    filechanged(e){
        console.log(e.target.files[0]);
        let regex = /.+\.(jpg|png)$/ig;
        if(regex.test(e.target.files[0].name)){
                this.setState({
                    imagefile:e.target.files[0],
                    loaded:1
                })
        }
    }

    mysubmit(e){
        e.preventDefault();
          if(this.state.loaded == 1){
            let form = new FormData();
            form.append("file",this.state.imagefile);
            axios.post(`/admin/api/add-post-image/${this.props.match.params.id}`,form).then(data=>{
                this.props.history.push("/");
            }).catch(err=>{
                console.log(err.response);
            })
          }
       
    }

    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <Header/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4 col-sm-offset-4">
                        <form method="post" action="#" id="#" onSubmit={this.mysubmit}>
                            <div className="form-group files">
                                <label>Upload Your File </label>
                                <input type="file" className="form-control" onChange={this.filechanged} name="file"/>
                             </div>
                             <div className="form-group">
                                <input type="submit" className="form-control btn-primary btn-block"/>
                             </div>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}