import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Util from './../utility';

import PostReply from './post_reply.component';

import noimage from './../common_images/noimage.png';

export default class ViewThread extends Component{

    constructor(props){
        super(props);

        const active = (this.props.match && this.props.match.params && this.props.match.params.id);

        this.refreshPage = this.refreshPage.bind(this);
        this.onDrop = this.onDrop.bind(this);

        this.state = {
            thread_head: {},
            replies: [{_id:""}],
            error_message: false,
            defined: active,
            thread_id: -1,
            pictures: [],
        }

    }

    componentDidMount(){
        this.refreshPage();
    }

    componentDidUpdate(){

    }

    refreshPage(){
        const active = (this.props.match && this.props.match.params && this.props.match.params.id && this.props.match.params.id !== this.state.thread_id);
        if(active){
            const new_id = this.props.match.params.id;
            this.setState({ //need the consts bc otherwise the delay in state breaks it
                thread_id: new_id
            })
            axios.get("http://localhost:5000/thread/" + new_id)
            .then(thread => { //maybe combines this with the next
                this.setState({
                    thread_head: thread.data,
                    error_message: false
                });
                axios.get("http://localhost:5000/thread/" + new_id + "/replies")
                .then(replies => {
                    this.setState({
                        replies: replies.data,
                        error_message: false
                    })
                }).catch(err => {
                    this.setState({
                        error_message: true
                    })
                });
            }).catch(error => {
                this.setState({
                    error_message: true
                })
            })
        }
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }
 

    render(){
        return(
            <div>
                {   this.state.error_message && // If display error message
                    <div className="container c-border">
                        <div>Failed to Load Thread: {this.state.thread_head._id}</div>
                        <img src={noimage} alt="None"/>
                        <Link to="/">Return to Catalog</Link>
                    </div>
                }
                {   !this.state.error_message && //IF Don't display error message
                    <div className="container">
                        <div className="c-border c-hoverable" style={{padding:"2vw"}}>
                            <img src={"http://localhost:5000/thread/"+this.state.thread_head._id+"/image"} alt="Thread" className="c-border c-drop-shadow" style={{maxWidth:"100%"}}/>
                            <div className="c-border-sides c-hoverable2">
                                <h1 className="c-hoverable3 width container" style={{marginTop:"1vh"}}> {this.state.thread_head.thread_title}</h1>
                                <p className="c-hoverable3 width container c-subtitle">
                                    <span className="c-hoverable4" title={"Thread Number: " + this.state.thread_head.thread_number}>[{this.state.thread_head.thread_number}]</span>
                                    <span className="c-hoverable4" style={{marginLeft:"1vw"}} title={"Posted On: " +Date(this.state.thread_head.createdAt)}>[{Util.timeSince(this.state.thread_head.createdAt)} ago]</span>
                                    <span className="c-hoverable4" style={{marginLeft:"1vw"}} title={"Poster Name: " + this.state.thread_head.name}>[{this.state.thread_head.name}]</span>

                                </p>
                                <p className="c-hoverable3 width container" style={{minHeight:"8vh"}}>{this.state.thread_head.body_text}</p>
                            </div>
                        </div>
                        <br/><i>Replies to this thread:{this.state.replies.length}</i>
                        <ul className="list list-unstyled">
                        {
                                this.state.replies.map((reply, index) => 
                                    <li 
                                    key={reply._id}
                                    className="c-border c-hoverable container"
                                    style={{marginBottom:"1vh"}}
                                    >
                                        <div className="container c-hoverable2" style={{margin:"1vh"}}>
                                            { reply.has_image && (
                                                <div>
                                                    <img src={"http://localhost:5000/thread/"+this.state.thread_head._id+"/image/"+reply._id} 
                                                    alt="Thread" className="c-border c-drop-shadow" 
                                                    style={{maxWidth:"100%", marginTop:"1vh", marginBottom:"2vh"}}/>
                                                </div>
                                                )
                                            }
                                            <div className="c-hoverable3 width container c-subtitle" style={{borderLeft: "1px solid black", paddingLeft:"1vw"}}>
                                                <span className="c-hoverable4" title={"Reply " + reply.local_reply_number + " of " + reply.reply_number + " replies"}>[{reply.local_reply_number} / {reply.reply_number}]</span>
                                                <span style={{marginLeft:"1vw"}} className="c-hoverable4" title={"Poster Name: " + reply.name}>[{reply.name}]</span>
                                                <span style={{marginLeft:"1vw"}} className="c-hoverable4" title={"Posted On: " + Date(reply.createdAt)}>[{Util.timeSince(reply.createdAt)} ago]</span>
                                            </div>
                                            <div style={{borderLeft: "1px solid black", marginTop:"1vh", paddingLeft:"1vw"}} className="c-hoverable3">
                                                {reply.body_text}
                                            </div>
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                        <PostReply parentId={this.state.thread_id}/>
                    </div>
                }
            </div>
        );
    }
}
