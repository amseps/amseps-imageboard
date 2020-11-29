import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class ViewThread extends Component{

    constructor(props){
        /*props:
            this.props.match.params.id
        */
        super(props);

        console.log(props);

        this.state = {
            thread_head: {},
            replies: [{}],
        }
    }

    componentDidMount(){

    }

    render(){
        return(
        <div>View Thread: {this.props.thread_id}</div>
        );
    }
}
