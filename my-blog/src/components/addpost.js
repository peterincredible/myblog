import React from "react";
import {connect} from "react-redux";
import axios from "axios";
import Header from "./header";
import Footer from "./footer";
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css'
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
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            text:"",
            errors:{
                title:"",
                content:""
            }
        }
        this.modules = {
			toolbar: [
		      [{ 'font': [] }],
		      [{ 'size': ['small', false, 'large', 'huge'] }],
		      ['bold', 'italic', 'underline'],
		      [{'list': 'ordered'}, {'list': 'bullet'}],
		      [{ 'align': [] }],
		      [{ 'color': [] }, { 'background': [] }],
		      ['clean']
		    ]
        };
        this.formats = [
		    'font',
		    'size',
		    'bold', 'italic', 'underline',
		    'list', 'bullet',
		    'align',
		    'color', 'background'
	  	];
    }
    submit(e){
        e.preventDefault();
        let posttitle = e.target.title.value;
        let postcontent = this.state.text
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
    handleChange(value, delta, source, editor) {
        this.setState({ text: editor.getHTML() })
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
                                <div className="form-group" id="edit">
                                    <label className="control-label" >Post content</label>

                                    <ReactQuill theme="snow"
                                        value={this.state.text} 
                                        onChange={this.handleChange}
                                        modules={this.modules}
                                        formats={this.formats}
                                         bounds={"#edit"}
                                        className=" rm-padding-lr rm-padding-tb"
                                       />
                                    {this.state.errors.content && <span className="text-danger">no post content</span>}
                                </div>
                               
                                <div className="form-group" style={{marginTop:"10px"}}>
                                        <input type="submit" value="Submit" className="btn btn-danger"/>
                                </div>

                            </form>
                         

                        </div>
                    </div>
                 
                    <div className="row flex-footer rm-margin-lr">
                        <div className="col-md-12 rm-padding-lr">
                             <Footer/>
                        </div>
                        
                    </div>
                </div>
        )
    }
}

export default connect(null)(Addpost);
 {/*<div className="form-group">
        <label className="control-label" >Post content</label>
        <textarea className="form-control" rows="15" name="content"/>
         {this.state.errors.content && <span className="text-danger">no post content</span>}
</div>*/}