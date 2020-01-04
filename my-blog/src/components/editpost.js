import React from "react";
import axios from 'axios';
import {connect} from "react-redux";
import Header from "./header";
import Footer from "./footer";
import {withRouter, NavLink} from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css'
class Editpost extends React.Component{
   constructor(props){
       super(props)
       this.submit = this.submit.bind(this);
       this.state = {id:"",title:"",content:""}
       this.titlechange= this.titlechange.bind(this)
       this.handleChange = this.handleChange.bind(this)
       this.modules = {
        toolbar: [
          [{ 'font': [] }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline'],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          [{ 'align': [] }],
          [{ 'color': [] }, { 'background': [] }],
          ["image"],
          ['clean']
        ]
    };
    this.formats = [
        'font',
        'size',
        'bold', 'italic', 'underline',
        'list', 'bullet',
        'align',
        'color', 'background',"image"
      ];
}




async handleChange (value){
    this.setState({ content: value});
  }
async submit(e){
   e.preventDefault();
   console.log(this.state.id);
   try{
      let title = e.target.title.value;
      let content = this.state.content;
      await axios.post(`/admin/api/edit-post/${this.state.id}`,{title,content});
      this.props.history.push(`/postimage/${this.state.id}`);
   }catch(err){
      console.log("an error occured in the submit edit post")
   }
   
}
async titlechange(e){
     this.setState({title:e.target.value})
}

async componentDidMount(){
    try{

        let data = await axios.get(`/admin/api/get-post/${this.props.match.params.id}`)
        let post = data.data.post
        console.log(post);
        this.setState({
            id:post._id,
            title:post.title,
            content:post.content    
    })
        
    }catch(err){
           console.log("there was an error on post edit")
    }

}
   render(){
       return(
        <div className="container-fluid flex-container">
        <div className="row">
            <div className="col-md-12 rm-padding-lr">
                <Header/>
            </div>
            
        </div>
        <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
                <form className="form" action="" method="POST" onSubmit={this.submit}>
                    <div className="form-group">
                        <label className="control-label" >Post Title</label>
                            <input className="form-control"type="text" name="title" value={`${this.state.title}`} onChange={this.titlechange}/>
                            {/*this.state.errors.title && <span className="text-danger">no post title</span>*/}
                    </div>
                    <div className="form-group">
                        <label className="control-label" >Post content</label>
                        <ReactQuill theme="snow"
                                        value={this.state.content} 
                                        onChange={this.handleChange}
                                        modules={this.modules}
                                        formats={this.formats}
                                        bounds={"#edit"}
                                        className="rm-padding-lr rm-padding-tb"
                                       />
                    </div>
                    <div className="form-group">
                            <input type="submit" value="Submit" className="btn btn-danger"/>
                    </div>
                </form>
                <NavLink to={`/postimage/${this.state.id}`} className="btn btn-default">Skip To Image</NavLink>
            </div>
        </div>
        <div className="row flex-footer">
            <div className="col-md-12 rm-padding-lr">
                 <Footer/>
            </div>
            
        </div>
    </div>
       )
   }

}

export default withRouter(Editpost)