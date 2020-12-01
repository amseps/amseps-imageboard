import React, {Component} from 'react';
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

        this.onDrop = this.onDrop.bind(this);



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
            thread_image: e.target.files[0]
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
        let formData = new FormData();
        formData.append('thread_image', this.state.thread_image);
        formData.append('body_text', this.state.body_text);
        formData.append('name', this.state.name);
        formData.append('thread_title', this.state.title)
        formData.append('test-field', 'test-data');
        console.log(formData.getAll);
        console.log(formData.entries());
        console.log(formData.get(0));

        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }

        const config = {     
            headers: { 'content-type': 'multipart/form-data',  "enctype":"multipart/form-data"}
        }

        axios.post('http://localhost:5000/thread/post_thread', formData, config)
        .then(res =>{
            console.log("Thread posted succesfully: ");
            console.log(res.data);
        })
        .catch(e => {
            console.log("Post Thread Error: " + e);
        })
    }

    onDrop(thread_image) {
        this.setState({
            thread_image: this.state.pictures.concat(thread_image),
        });
    }

    render(){
        return(
            <div>
                <h3>Post New Thread</h3>
                <form onSubmit={this.submitThread}>
                    <div className="form-group">
                        <input type="file" 
                        required
                        className="form-control"
                        onChange={this.changeImage}
                        />
                    </div>
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
                        className="form-control"
                        value={this.state.name}
                        onChange={this.changeName}
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