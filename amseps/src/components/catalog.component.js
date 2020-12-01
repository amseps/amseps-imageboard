import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import PostThread from './post_thread.component';
import axios from 'axios';

import ViewThread from "./view_thread.component.js";

export default class Catalog extends Component{
    constructor(props){
        super(props);

        //register functions
        this.componentDidMount = this.componentDidMount.bind(this);
        this.enterThread = this.enterThread.bind(this);
        this.refreshThreads = this.refreshThreads.bind(this);

        this.state = {
            threads: []
        };
    }

    componentDidMount(){
        this.refreshThreads();
    }

    enterThread(e, thread){
        e.preventDefault();
        console.log("Clicked thread: " + thread._id);
        window.location = ("http://localhost:3000/thread/" + thread._id);
    }

    refreshThreads(){
        axios.get("http://localhost:5000/thread")
        .then(res =>{
            console.log(res.data);
            this.setState({
                threads: (res.data).sort((a,b) => a.updatedAt < b.updatedAt ? 1 : -1) //inserts into state and sorts
            });
        });
        console.log("Loaded Threads: " + this.state.threads);
    }

    render(){
        return(
            <div>
                <PostThread props={this.state.threads} />
                Catalog
                Numthreads: {this.state.threads.length}
                <ul className="list-group">
                    {
                        this.state.threads.map((thread) => (
                            <li 
                            key={thread._id} 
                            className="list-group-item d-flex justify-content-between list-group-item-action flex-column align-items-start"
                            onClick={(e) => this.enterThread(e, thread)}
                            >
                                <div className="row">
                                <span className="badge badge-primary justify-content-center">{thread.thread_votes.green}5</span>
                                <button 
                                onClick={(e) => this.enterThread(e, thread)}
                                className="btn btn-outline-secondary"
                                >
                                    <b>{thread.thread_title}</b>
                                </button>
                                </div>
                                <img src={"http://localhost:5000/thread/"+thread._id+"/image"} />
                                {thread.body_text}
                                
                            </li>
                        ))
                    }
                </ul>
                Le end
            </div>
        );
    }
}
