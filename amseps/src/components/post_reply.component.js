import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import noimage from './../common_images/noimage.png';

export default class PostReply extends Component{

    constructor(props){
        super(props);

        //register functions with this
        this.submitReply = this.submitReply.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeBodyText = this.changeBodyText.bind(this);
        this.changeImage = this.changeImage.bind(this);

        this.state={
            error_text: "",
            body_text: "",
            name: "",
            reply_image: "",
        };
    }

    componentDidMount(){

    }
    changeBodyText(e){
        this.setState({
            body_text: e.target.value
        });
    }
    changeImage(e){
        this.setState({
            reply_image: e.target.value
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
        const newReply = {
            body_text: this.state.body_text,
            name: this.state.name,
            reply_image: this.state.reply_image,
        }
        if(newReply.body_text === "") newReply.body_text= "anon";
        console.log("going to post reply");
        console.log(newReply);
        axios.post("http://localhost:5000/thread/" + this.props.parentId + "/post_reply", newReply)
        .then(res =>{
            console.log("Reply posted succesfully: ");
            console.log(res.data);
        })
        .catch(e => {
            console.log("Post Reply Error: " + e);
        })
    }

    render(){
        return(
            <div className="container">
                <h6>Reply</h6>
                <form onSubmit={this.submitReply}>
                    <div className="form-group">
                        <input type="text"
                        placeholder="name"
                        className="form-control"
                        value={this.state.name}
                        onChange={this.changeName}
                        />
                    </div>
                    <div className="form-group">
                        <input type="text"
                        placeholder="image"
                        className="form-control"
                        value={this.state.reply_image}
                        onChange={this.changeImage}
                        />
                    </div>
                    <div className="form-group">
                        <input type="text"
                        placeholder="body"
                        required className="form-control"
                        value={this.state.body_text}
                        onChange={this.changeBodyText}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Post Reply" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}