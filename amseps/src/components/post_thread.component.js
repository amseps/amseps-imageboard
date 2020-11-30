import React, {Component} from 'react';
import axios from 'axios';

import FileUploader from './FileUploader.component';

export default class PostThread extends Component{

    constructor(props){
        super(props);

        //register functions with this
        this.submitThread = this.submitThread.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeBodyText = this.changeBodyText.bind(this);
        this.changeImage = this.changeImage.bind(this);
        this.onDrop = this.onDrop.bind(this);



        this.state={
            error_text: "",
            body_text: "",
            title: "",
            name: "",
            thread_image: "",
            pictures: [],
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
        const newThread = {
            body_text: this.state.body_text,
            thread_title: this.state.title,
            name: this.state.name,
            thread_image: this.state.thread_image,
        }
        axios.post('http://localhost:5000/thread/post_thread', newThread)
        .then(res =>{
            console.log("Thread posted succesfully: ");
            console.log(res.data);
        })
        .catch(e => {
            console.log("Post Thread Error: " + e);
        })
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    render(){
        return(
            <div>
                <h3>Post New Thread</h3>
                <FileUploader />
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