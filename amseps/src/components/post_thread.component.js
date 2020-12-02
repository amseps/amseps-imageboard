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
            thread_image_preview: "",
            counter_classname: "c-border-light",
        };
    }

    componentDidMount(){

    }

    changeBodyText(e){
        this.setState({
            body_text: e.target.value,
            counter_classname: (this.state.body_text.length < 1024)? "c-border-light" : "c-border-red"
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
        const reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                thread_image_preview: reader.result
            })
        }
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            this.setState({
                thread_image_preview :reader.result
            })
        } 
        else {
            this.setState({
                thread_image_preview: ""
            })
        }
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
                <form onSubmit={this.submitThread} className="container">
                    <h5>Post New Thread</h5>
                    <div className="form-group c-no-vert-margins">
                        <input type="text"
                        placeholder="title"
                        required className="form-control"
                        value={this.state.title}
                        onChange={this.changeTitle}
                        />
                    </div>
                    <div className="form-group c-no-vert-margins">
                        <input type="text"
                        placeholder="name"
                        className="form-control"
                        value={this.state.name}
                        onChange={this.changeName}
                        />
                    </div>
                    <div className="form-group c-no-vert-margins">
                        <textarea
                        placeholder="body"
                        required className="form-control d-flex c-body-input mb-auto p-2"
                        value={this.state.body_text}
                        onChange={this.changeBodyText}
                        style={{minHeight:'70px'}}
                        />
                    </div>
                    <div style={{marginTop:'-2.5%', marginLeft:'1%', backgroundColor:"#ffffff", maxWidth:"5vw", paddingLeft:".3vw", backgroundColor:'white'}} className={this.state.counter_classname}>
                            [{this.state.body_text.length}/1024]
                    </div>
                    <div></div>
                    <div className="form-group c-no-vert-margins">
                        <input type="file" 
                        required
                        className="form-control"
                        onChange={this.changeImage}
                        style={{marginTop:'1%'}}
                        />
                        <img style={{maxHeight:'30vh', maxWidth:'100%', marginTop:'3%', marginBottom:'3%'}} src={this.state.thread_image_preview} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Post Thread" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}