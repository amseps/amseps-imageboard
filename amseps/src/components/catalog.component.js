import React, {Component} from 'react';
import PostThread from './post_thread.component';
import axios from 'axios';
import Util from './../utility';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {Link} from 'react-router-dom';


export default class Catalog extends Component{
    constructor(props){
        super(props);

        //register functions
        this.componentDidMount = this.componentDidMount.bind(this);
        this.enterThread = this.enterThread.bind(this);
        this.refreshThreads = this.refreshThreads.bind(this);

        this.state = {
            threads: [],
            threads_loaded: false,
        };
    }

    componentDidMount(){
        this.refreshThreads();
    }

    enterThread(e, thread){
        e.preventDefault();
        window.location = ("http://localhost:3000/thread/" + thread._id);
    }

    refreshThreads(){
        axios.get("http://localhost:5000/thread")
        .then(res =>{
            this.setState({
                threads: (res.data).sort((a,b) => a.updatedAt < b.updatedAt ? 1 : -1), //inserts into state and sorts
                threads_loaded: true,
            });
        });
    }

    render(){
        return(
            <div>
                <PostThread props={this.state.threads} />
                Catalog
                Numthreads: {this.state.threads.length}
                <div className="container-fluid">
                    <ul className="d-flex flex-wrap justify-content-md-around align-content-stretch align-items-center">
                        {   (this.state.threads_loaded)?
                            (   //threads have loaded
                                this.state.threads.map((thread) => (
                                    <div style={{marginBottom: '1.5%'}} key={thread._id}>
                                        <li 
                                        key={thread._id} 
                                        className="container c-list c-padding-md c-clickable c-border c-drop-shadow"
                                        >
                                            <Link to={"/thread/" + thread._id} style={{all:"unset"}}>
                                                <div className="d-flex justify-content-start align-items-center">
                                                    <span className="badge badge-primary justify-content-center c-no-rounded-corners c-border">{thread.number_of_replies}</span>
                                                    <div  style={{marginLeft:'5%', minWidth:'80%'}}>
                                                        <div className="c-underline c-clickable2"><b>{thread.thread_title}</b></div>
                                                        <div className="c-subtitle">
                                                            <span className="c-clickable2" title={"Thread Number: " + thread.thread_number}>[{thread.thread_number}]</span>
                                                            <span className="c-clickable2" title={"Posted On: " + Date(thread.createdAt)} style={{marginLeft: '2%'}}>[{Util.timeSince(thread.createdAt)} ago]</span>
                                                            <span className="c-clickable2" style={{marginLeft:'2%'}}>[{thread.name}]</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                                <div className="d-flex justify-content-between">
                                                    <LazyLoadImage src={"http://localhost:5000/thread/"+thread._id+"/image/thumb"} alt="Thread" style={{height:100}} className="c-border c-drop-shadow-sm"/>
                                                    <p className="container">{thread.body_text}</p>
                                                </div>
                                            </Link>
                                        </li>
                                    </div>
                                ))
                            )
                            :
                            (   //threads not loaded yet
                                <div class="spinner-border" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            )
                        }
                    </ul>
                </div>
            </div>
        );
    }
}
