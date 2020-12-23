import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Util from './../utility';
import LazyImage from './lazyimage.component';
//import Draggable from 'react-draggable'; // The default
import { HashLink } from 'react-router-hash-link';

import PostReply from './post_reply.component';

import noimage from './../common_images/noimage.png';

export default class ViewThread extends Component{

    constructor(props){
        super(props);

        this.refreshPage = this.refreshPage.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.markup = this.markup.bind(this);
        this.processReplies = this.processReplies.bind(this);
        this.clickedReplyNumber = this.clickedReplyNumber.bind(this);
        this.focusOnReply = this.focusOnReply.bind(this);
        this.peekReplyPrep = this.peekReplyPrep.bind(this);
        this.peekReplyEnd = this.peekReplyEnd.bind(this);

        this.state = {
            thread_head: {},
            replies: [{_id:""}],
            error_message: false,
            error_message_info: "",
            thread_id: -1,
            pictures: [],
            isloading: true,

            postReplyText: "",
            currentlyFocusedReply: -1,

            showPeekedReply: false,
            mouseX: 50,
            mouseY: 50,
            hoveredReply: null,
        }

    }

    componentDidMount(){
        this.refreshPage();
    }

    componentDidUpdate(){

    }

    async refreshPage(){
        this.setState({isloading:true})
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
                    error_message: false,
                    isloading: false,
                    //do replies in the function below
                })
                this.processReplies(replies.data);
            }).catch(err => {
                if(err.response.status === 204){
                    console.log("204, No replies to show")
                }else{ // 400 ...
                    this.setState({
                        error_message: true,
                        isloading: false,
                    });
                }
            });
        }).catch(error => {
            this.setState({
                error_message: true,
                error_message_info: error.response.data.info,
                isloading: false,
            })
        })
        this.setState({isloading:false})
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    markup(text, myReplyNumber, allReplies){
        let lines = text.split('\n');
        for(let i = 0 ; i < lines.length; i++){
            if(lines[i][0] && lines[i][0] === '>'){
                if(lines[i][1] && lines[i][1] === '>'){
                    if(lines[i][1] && lines[i][2] === '>'){ //superquote
                        lines[i] = <span className="m-superquote">{lines[i]}</span>
                    }else{// >> doublequote // also as it stands you are not allowed to reply to the thread itself
                        let replynum = parseInt(lines[i].substring(2));
                        let replyingtoIndex = allReplies.findIndex(reply => reply.reply_number === replynum);
                        let replyingto = allReplies[replyingtoIndex];
                        if(replyingto){ // if we found something it's replying to
                            lines[i] = 
                            <HashLink 
                            style={{textDecoration:'none'}}
                            smooth
                            scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                            className="c-subtitle"
                            to={"#rep_"+replyingto.reply_number}
                            onClick={() => this.focusOnReply(replyingto.reply_number)}
                            onMouseEnter={(elem) => this.peekReplyPrep(elem, replyingto.reply_number)}
                            onMouseLeave={(elem) => this.peekReplyEnd(elem, replyingto.reply_number)}
                            >
                                {">>"}
                                <span className="m-quoted">
                                    <span className="m-outer-quoted">
                                        {replynum}
                                    </span>
                                {"["}{replyingto.body_text.substring(0, 100)}{replyingto.body_text.length > 100 && "..."}{"]"}
                                </span>
                            </HashLink>
                            //we will also add that this is a reply to replyingto
                            if(!replyingto.repliesToMe) replyingto.repliesToMe = [];
                            const ind = replyingto.repliesToMe.findIndex(elem => elem === myReplyNumber);
                            if(ind < 0){ // if there are no clones of me already
                                replyingto.repliesToMe.push(myReplyNumber);
                                let currReplies = allReplies;
                                currReplies[replyingtoIndex] = replyingto // is a reference so no need to setState ... (;_;),b
                            }
                        }
                    }
                }else{// > quote
                    lines[i] = <span className="m-quote">{lines[i]}</span>
                }
            }else{//not a quote

            }
            lines[i] = <span>{lines[i]}<br/></span>
        }
        return (<div>{lines}</div>);
    }
    processReplies(replies){
        let newreplies = [{}];
        replies.forEach(rep => {
            rep.myMarkup = this.markup(rep.body_text, rep.reply_number, replies)
            newreplies.push(rep);
        })
        newreplies.shift(); // remove empty elem at start
        this.setState({
            replies: newreplies
        });
    }


    focusOnReply(repNum){
        let focussed = this.state.replies.find(rep => repNum === rep.reply_number)
        if(focussed){
            let oldFocus = this.state.replies.find(rep => this.state.currentlyFocusedReply === rep.reply_number)
            if(oldFocus){
                oldFocus.isFocus = false;
            }
            focussed.isFocus = true;
            this.setState({
                currentlyFocusedReply: repNum
            })
        }
    }

    peekReplyPrep(e, repNum){
        let focussed = this.state.replies.find(rep => repNum === rep.reply_number)
        if(focussed){
            this.setState({
                showPeekedReply: true,
                hoveredReply: focussed,
                mouseX: e.screenX,
                mouseY: e.screenY
            })
        }
    }
    peekReplyEnd(e, repNum){
        this.setState({
            showPeekedReply: false,
        })
    }

    clickedReplyNumber(reply){
        this.setState({
            postReplyText: reply.reply_number
        });
    }

    render(){
        return(
            <div>
                { (!this.state.isloading)?
                (
                    <div>
                        {   this.state.error_message && // If display error message
                            <div className="container c-border">
                                <div>Failed to Load Thread: {this.state.thread_head._id}<br/>Extra info: {this.state.error_message_info}</div>
                                <img src={noimage} alt="None"/>
                                <Link to="/">Return to Catalog</Link>
                            </div>
                        }
                        {   !this.state.error_message && //IF Don't display error message
                            <div className="container">
                                <div 
                                className="c-border c-hoverable" style={{padding:"2vw"}}
                                id={"rep_"+this.state.thread_id}
                                >
                                    <div handle="strong">
                                        <div style={{display:"inline-block"}}> 
                                            {/* <strong className="cursor" style={{cursor:"move", backgroundColor:"inherit", width:"4vw"}}>
                                                ■ //this was previously the Draggable component (;__;),b
                                            </strong> */}
                                            { this.state.thread_head._id && // if defined
                                                <img src={"http://localhost:5000/thread/"+this.state.thread_head._id+"/image"} alt="Thread" className="c-border c-drop-shadow" style={{maxWidth:"100%"}}/>
                                            }
                                        </div>
                                    </div>
                                    <div className="c-border-sides c-hoverable2">
                                        <h1 className="c-hoverable3 width container" style={{marginTop:"1vh"}}> {this.state.thread_head.thread_title}</h1>
                                        <p className="c-hoverable3 width container c-subtitle">
                                            <span className="c-hoverable4" title={"Thread Number: " + this.state.thread_head.thread_number}>[{this.state.thread_head.thread_number}]</span>
                                            <span className="c-hoverable4" style={{marginLeft:"1vw"}} title={"Poster Name: " + this.state.thread_head.name}>[{this.state.thread_head.name}]</span>
                                            <span className="c-hoverable4" style={{marginLeft:"1vw"}} title={"Posted On: " +Date(this.state.thread_head.createdAt)}>[{Util.timeSince(this.state.thread_head.createdAt)} ago]</span>
                                        </p>
                                        <p className="c-hoverable3 width container" style={{minHeight:"8vh"}}>{this.state.thread_head.body_text}</p>
                                    </div>
                                </div>
                                <br/><i>Replies to this thread:{this.state.replies.length}</i>
                                <ul className="list list-unstyled">
                                {
                                        this.state.replies.map((reply, index) => 
                                            <li 
                                            key={reply.id}
                                            id={"rep_"+reply.reply_number}
                                            className={"c-border c-hoverable container "+(reply.isFocus && "c-focus c-drop-shadow")}
                                            style={{marginBottom:"1vh"}}
                                            >
                                                <div className="container c-hoverable2" style={{margin:"1vh"}}>
                                                    { reply.has_image && (
                                                        <div>
                                                            <LazyImage 
                                                            fullimg={"http://localhost:5000/thread/"+this.state.thread_head._id+"/image/"+reply._id} 
                                                            thumbimg={"http://localhost:5000/thread/"+this.state.thread_head._id+"/image/"+reply._id+"/thumb"}
                                                            alt="Thread" className="c-border c-drop-shadow" 
                                                            style={{maxWidth:"100%", marginTop:"1vh", marginBottom:"2vh"}}/>
                                                        </div>
                                                        )
                                                    }
                                                    <div className="c-hoverable3 width container c-subtitle" style={{borderLeft: "1px solid black", paddingLeft:"1vw"}}>
                                                        <button onClick={() => this.clickedReplyNumber(reply)} style={{border:'none', backgroundColor:"inherit"}}>
                                                            <span className="c-hoverable4" title={"Reply " + reply.local_reply_number + " of " + reply.reply_number + " replies"}>
                                                                [{reply.local_reply_number} / {reply.reply_number}]
                                                            </span>
                                                        </button>
                                                        <span style={{marginLeft:"1vw"}} className="c-hoverable4" title={"Poster Name: " + reply.name}>[{reply.name}]</span>
                                                        <span style={{marginLeft:"1vw"}} className="c-hoverable4" title={"Posted On: " + Date(reply.createdAt)}>[{Util.timeSince(reply.createdAt)} ago]</span>
                                                    </div>
                                                    <div className="c-hoverable3 width container c-subtitle">
                                                        {
                                                            (reply.repliesToMe) && // if this reply has any replies to it
                                                            (
                                                                reply.repliesToMe.map(rep => (
                                                                    <HashLink
                                                                    key={rep.id}
                                                                    scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                                                                    smooth
                                                                    to={"#rep_"+rep}
                                                                    onClick={() => this.focusOnReply(rep)}
                                                                    onMouseEnter={(elem) => this.peekReplyPrep(elem, rep)}
                                                                    onMouseLeave={(elem) => this.peekReplyEnd(elem, rep)}
                                                                    >
                                                                        {" >>"}{rep}
                                                                    </HashLink>
                                                                ))
                                                            )
                                                        }
                                                    </div>
                                                    <div style={{borderLeft: "1px solid black", marginTop:"1vh", paddingLeft:"1vw"}} className="c-hoverable3">
                                                        {reply.myMarkup}
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    }
                                </ul>
                                <PostReply 
                                parentId={this.state.thread_id} 
                                suppliedText={this.state.postReplyText} 
                                refreshParent={this.refreshPage}/>
                                {this.state.showPeekedReply && 
                                    <div className="c-bg c-border c-subtitle" style={{position:'fixed', left:this.state.mouseX-window.screenX, top:this.state.mouseY-window.screenY, maxWidth:'30vw', padding:'4px'}}>
                                        <div className="d-flex flex-column">
                                            { this.state.hoveredReply.has_image && 
                                                <div>
                                                    [image]
                                                </div>
                                            }
                                            <div className="c-subtitle flex-row c-subtitle">
                                                <div className="d-flex justify-content-start">
                                                    <span>[{this.state.hoveredReply.local_reply_number} / {this.state.hoveredReply.reply_number}]</span>
                                                    <span>[{this.state.hoveredReply.name}]</span>
                                                    <span>[{Util.timeSince(this.state.hoveredReply.createdAt)} ago]</span>
                                                </div>
                                            </div>
                                            <div>
                                                {this.state.hoveredReply.myMarkup}
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                )
                :
                ( //is still loading
                    <div className="spinner-border text-center" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                )
                }
            </div>
        );
    }
}
