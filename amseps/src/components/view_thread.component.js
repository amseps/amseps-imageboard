import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import PropTypes from 'prop-types';

import Figure from 'react-bootstrap/Figure'

export default class ViewThread extends Component{

    constructor(props){
        super(props);

        const active = (this.props.match && this.props.match.params && this.props.match.params.id);

        this.refreshPage = this.refreshPage.bind(this);

        this.state = {
            thread_head: {},
            replies: [{}],
            error_message: false,
            defined: active,
            thread_id: -1
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
                    console.log(replies.data);
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

    render(){
        return(
            <div>
                <div>View Thread: {this.state.thread_id}</div>
                {   this.state.error_message && // If display error message
                    <div>Failed to Load Threads</div>
                }
                {   !this.state.error_message && //IF Don't display error message
                    <div>
                        <Figure className>
                            <Figure.Image alt="no image" src="abcde.png"/>
                            <Figure.Caption>
                                <h1>{this.state.thread_head.thread_title} {this.state.thread_head.id}</h1>
                                <b>{this.state.thread_head.name}</b>
                                <p>{this.state.thread_head.body_text}</p>
                            </Figure.Caption>
                        </Figure>
                        penis:{this.state.replies.length}
                        {
                            this.state.replies.map((reply) => (
                                <div>
                                    sex havers:
                                    <b>{reply.body_text}</b>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
        );
    }
}
