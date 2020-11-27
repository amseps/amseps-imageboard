import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class PostThread extends Component{

    constructor(props){
        super(props);

        //register functions with this
        this.submitThread = this.submitThread.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeBodyText = this.changeBodyText.bind(this);
        this.changeImage = this.changeImage.bind(this);



        this.state={
            error_text: "",
            body_text: "",
            title: "",
            name: "",
            thread_image: "",
        };
    }

    componentDidMount(){

    }

    changeBodyText(e){
        this.setState({
            body_text: e.target.value
        });
    }

    changeTitle(e){
        this.setState({
            title: e.target.value
        });
    }
    
    changeImage(e){
        this.setState({
            thread_image: e.target.value
        });
    }
    
    changeName(e){
        this.setState({
            name: e.target.value
        });
    }
    submitThread(e){
        //TODOL put in checks for goode data
        e.preventDefault();
        console.log("SUBMIT THREAD");
        let threadNum = -1;
        axios.get("http://localhost:5000/world/new_thread")
        .then(res => {
            console.log(res.data);
            console.log(res.data.thread_number);
            threadNum = res.data.thread_number;
            const newThread = {
                body_text: this.state.body_text,
                thread_title: this.state.title,
                name: this.state.name,
                thread_image: this.state.thread_image,
                thread_number: threadNum,
                post_date:  new Date()
            }
            console.log("NEWTHREAD");
            console.log(newThread);
            axios.post('http://localhost:5000/thread/post_thread', newThread)
            .then(res =>{
                console.log(res.data);
            })
            .catch(e => {
                console.log("PostThread Error: " + e);
            })
        }).catch(err =>{
            console.log("Ax /world/new_thread Error: " + err);
            return;
        });
    }

    render(){
        return(
            <div>
                <h3>Post New Thread</h3>
                <form onSubmit={this.submitThread}>
                    <div className="form-group">
                        <input type="text"
                        placeholder="title"
                        required className="form-control"
                        value={this.state.title}
                        onChange={this.changeTitle}
                        />
                    </div>
                    <div className="form-group">
                        <input type="text"
                        placeholder="name"
                        required className="form-control"
                        value={this.state.name}
                        onChange={this.changeName}
                        />
                    </div>
                    <div className="form-group">
                        <input type="text"
                        placeholder="image"
                        required className="form-control"
                        value={this.state.thread_image}
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
                        <input type="submit" value="Post Thread" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}