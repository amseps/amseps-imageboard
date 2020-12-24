import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
import axios from 'axios';

import imageCompression from 'browser-image-compression'

//import noimage from './../common_images/noimage.png';
 
//import {Badge, Toast} from 'react-bootstrap'


export default class PostReply extends Component{

    constructor(props){
        super(props);

        //register functions with this
        this.submitReply = this.submitReply.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeBodyText = this.changeBodyText.bind(this);
        this.changeImage = this.changeImage.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.toggleReplyWidget = this.toggleReplyWidget.bind(this);
        this.newToast = this.newToast.bind(this);
        this.closeToast = this.closeToast.bind(this);

        this.state={
            supplied_text: (props.suppliedText)? props.suppliedText : "" ,
            //this.props.refreshParent();
            error_text: "",
            body_text: "",
            name: "",
            reply_image: "",
            reply_image_preview: "",
            counter_classname: "c-border-light",
            submitting_reply: false,
            toasts: [], //[{}]
            toast_id_counter: 0,

            prevSuppliedText: -1,

            showReplyWidget: false,
        };
    }

    componentDidMount(){

    }
    componentDidUpdate(){
        if(this.props.suppliedText && !(this.props.suppliedText === this.state.prevSuppliedText)){
            let newtex = this.state.body_text + ">>" + this.props.suppliedText.toString() + '\n'; // .. you can't mutate strings specifically for textarea? that's surreal
            this.setState({
                prevSuppliedText: this.props.suppliedText,
                body_text: newtex,
                showReplyWidget: true,
            });

        }
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

    async newToast(myhead, mybody){
        let newtoasts  = JSON.parse(JSON.stringify(this.state.toasts)); 
        newtoasts.push({
                head: myhead,
                body: mybody,
                id: this.state.toast_id_counter
            })
        let count = this.state.toast_id_counter + 1;
        this.setState({
            toasts: newtoasts,
            toast_id_counter: count
        })
    }

    async closeToast(e, toastid){
        e.preventDefault();
        console.log('trying to delete taost: ' , toastid)
        let newtoasts  = JSON.parse(JSON.stringify(this.state.toasts));
        console.log(newtoasts)
        newtoasts = newtoasts.filter(elem => elem.id !== toastid);
        console.log(newtoasts)
        this.setState({toasts:newtoasts});
    }

    async submitReply(e){
        e.preventDefault();
        console.log("Submitting Reply");
        this.setState({submitting_reply:true})
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
                    if(res)console.log(res.data);
                    console.log('trying to refresh parent')
                    this.props.refreshParent();
                })
                .catch(e => {
                    console.log("111 Post Reply Error: " + e);
                    this.newToast("Reply Fail", "Could not post your reply because your image couldn't upload. Images must be jpg, jpeg, png, or gif, with a 2mb filesize limit");
                })
            })
        }else{ // if no image
            axios.post("http://localhost:5000/thread/" + this.props.parentId + "/post_reply", formData, config)
            .then(res =>{
                console.log("Reply posted succesfully: ");
                console.log(res.data);
                console.log('trying to refresh parent')
                this.props.refreshParent();
            })
            .catch(e => {
                console.log("222 Post Reply Error: " + e);
                this.newToast("Reply Fail", "Could not post your reply");
            })
        }
        this.setState({submitting_reply:false})
    }

    toggleReplyWidget(){
        this.setState({
            showReplyWidget: (this.state.showReplyWidget)? false : true //why must u be like this javascript
        })
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
                                <textarea
                                type="text"
                                placeholder="body"
                                required 
                                className="form-control d-flex c-body-input mb-auto p-2"
                                value={this.state.body_text}
                                onChange={this.changeBodyText}
                                style={{minHeight: '70px'}}
                                />
                            </div>
                            <div style={{marginTop:'-2.5%', marginLeft:'1%', backgroundColor:"#ffffff", maxWidth:"5vw", paddingLeft:".3vw"}} className={this.state.counter_classname}>
                                    [{this.state.body_text.length}/1024]
                            </div>
                            <div className="form-group c-no-vert-margins">
                                <input type="file" 
                                accept="image/*"
                                className="form-control"
                                onChange={this.changeImage}
                                style={{marginTop:'1%'}}
                                />
                                <img style={{maxHeight:'30vh', maxWidth:'100%', marginTop:'3%', marginBottom:'3%'}} src={this.state.reply_image_preview} alt={""}/>
                            </div>
                            <div className="form-group c-no-vert-margins d-flex row">
                                <input type="submit" value="Post Reply" className="btn btn-primary" />
                                {   this.state.submitting_reply &&
                                    <div className="d-flex row">
                                        <div className="spinner-border text-center" role="status" style={{marginLeft:'2vw'}}>
                                            <span className="sr-only"></span>
                                        </div>
                                        Posting Reply... 
                                    </div>
                                }
                            </div>
                        </form>
                    </div>
                </div>
                {(this.state.showReplyWidget)? //if replyWidget active
                (
                    <div className="a-bottom-right" style={{width:"30%"}}>
                        <form onSubmit={this.submitReply} style={{padding:"1vw"}} className="c-border c-bg c-drop-shadow-sm">
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
                                type="text"
                                rows="6"
                                placeholder="body"
                                required 
                                className="form-control d-flex c-body-input mb-auto p-2"
                                value={this.state.body_text}
                                onChange={this.changeBodyText}
                                style={{minHeight: '70px'}}
                                />
                            </div>
                            <div style={{marginTop:'-2.5%', marginLeft:'1%', backgroundColor:"#ffffff", maxWidth:"5vw", paddingLeft:".3vw"}} className={this.state.counter_classname}>
                                    [{this.state.body_text.length}/1024]
                            </div>
                            <div className="form-group c-no-vert-margins">
                                <input type="file" 
                                accept="image/*"
                                className="form-control"
                                onChange={this.changeImage}
                                style={{marginTop:'1%'}}
                                />
                                <img style={{maxHeight:'30vh', maxWidth:'100%', marginTop:'3%', marginBottom:'3%'}} src={this.state.reply_image_preview} alt={""}/>
                            </div>
                            <div className="form-group c-no-vert-margins">
                                <input type="submit" value="Post Reply" className="btn btn-primary" />
                            </div>
                        </form>
                        <div className="d-flex align-items-right">
                            <button onClick={() => this.toggleReplyWidget()} className="c-border c-bg c-drop-shadow-sm ml-auto" style={{marginTop:'4px'}}>
                                <div style={{float:'right'}}>reply</div>
                            </button>
                        </div>
                    </div>
                ):( //replyWidget is inactive

                    <div className="a-bottom-right">
                        <button onClick={() => this.toggleReplyWidget()} className="c-border c-bg c-drop-shadow-sm">
                            reply
                        </button>
                    </div>
                )
                }
                <div className="a-toast">
                    {   //errors in the top right corner
                        this.state.toasts.map((thistoast) => 
                            <div key={thistoast.id} className="c-border c-no-rounded-corners" style={{padding:'8px'}}>
                                <div className="d-flex row">
                                    <button onClick={e => this.closeToast(e, thistoast.id)} className="c-border c-br-drop-shadow">
                                        <div className="justify-content-center c-no-rounded-corners" style={{marginLeft:'8px'}}>{thistoast.id}</div>
                                    </button>
                                    <div className="mr-auto" style={{marginLeft:'8px'}}>{thistoast.head}</div>
                                </div>
                                <div>{thistoast.body}</div>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}
