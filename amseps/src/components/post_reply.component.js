import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import imageCompression from 'browser-image-compression'

import noimage from './../common_images/noimage.png';


export default class PostReply extends Component{

    constructor(props){
        super(props);

        //register functions with this
        this.submitReply = this.submitReply.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeBodyText = this.changeBodyText.bind(this);
        this.changeImage = this.changeImage.bind(this);
        this.onDrop = this.onDrop.bind(this);

        this.state={
            error_text: "",
            body_text: "",
            name: "",
            reply_image: "",
            reply_image_preview: "",
            counter_classname: "c-border-light",

            m_target: null,
            m_container: null,
        };
    }

    componentDidMount(){

    }
    changeBodyText(e){
        this.setState({
            body_text: e.target.value
        });
    }
    changeName(e){
        this.setState({
            name: e.target.value
        });
    }

    submitReply(e){
        e.preventDefault();
        console.log("Submitting Reply");
        let formData = new FormData();
        formData.append('body_text', this.state.body_text);
        formData.append('name', this.state.name);
        formData.append('thread_title', this.state.title)
        const config = {     
            headers: { 'content-type': 'multipart/form-data',  "enctype":"multipart/form-data"}
        }
        if(this.state.reply_image){ // if we have an image
            formData.append('reply_image', this.state.reply_image);
            const f = this.state.reply_image;
            imageCompression(f,
                {maxSizeMB: .1, maxWidthOrHeight:150}
            ).then(t =>{
                const file_t = new File([t], f.name, {type:f.type});
                formData.append('reply_image_thumb', file_t); 
                axios.post("http://localhost:5000/thread/" + this.props.parentId + "/post_reply", formData, config)
                .then(res =>{
                    console.log("Reply posted succesfully: ");
                    console.log(res.data);
                })
                .catch(e => {
                    console.log("Post Reply Error: " + e);
                })
            })
        }else{ // if no image
            axios.post("http://localhost:5000/thread/" + this.props.parentId + "/post_reply", formData, config)
            .then(res =>{
                console.log("Reply posted succesfully: ");
                console.log(res.data);
            })
            .catch(e => {
                console.log("Post Reply Error: " + e);
            })
        }
    }

    onDrop(thread_image) {
        this.setState({
            thread_image: this.state.pictures.concat(thread_image),
        });
    }
    changeImage(e){
        this.setState({
            reply_image: e.target.files[0]
        });
        const reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                reply_image_preview: reader.result
            })
        }
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            this.setState({
                reply_image_preview :reader.result
            })
        } 
        else {
            this.setState({
                reply_image_preview: ""
            })
        }
    }

    render(){
        return(
            <div>
                <div className="container">
                    <div className="container">
                        <h6>Post New Reply</h6>
                        <form onSubmit={this.submitReply}>
                            <div className="form-group c-no-vert-margins">
                                <input type="text"
                                placeholder="name"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.changeName}
                                />
                            </div>
                            <div className="form-group c-no-vert-margins">
                                <textArea
                                placeholder="body"
                                required className="form-control d-flex c-body-input mb-auto p-2"
                                value={this.state.body_text}
                                onChange={this.changeBodyText}
                                style={{minHeight: '70px'}}
                                />
                            </div>
                            <div style={{marginTop:'-2.5%', marginLeft:'1%', backgroundColor:"#ffffff", maxWidth:"5vw", paddingLeft:".3vw", backgroundColor:'white'}} className={this.state.counter_classname}>
                                    [{this.state.body_text.length}/1024]
                            </div>
                            <div className="form-group c-no-vert-margins">
                                <input type="file" 
                                accept="image/*"
                                className="form-control"
                                onChange={this.changeImage}
                                style={{marginTop:'1%'}}
                                />
                                <img style={{maxHeight:'30vh', maxWidth:'100%', marginTop:'3%', marginBottom:'3%'}} src={this.state.reply_image_preview} />
                            </div>
                            <div className="form-group c-no-vert-margins">
                                <input type="submit" value="Post Reply" className="btn btn-primary" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
