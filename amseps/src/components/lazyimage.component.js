import React, {Component} from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import noimage from './../common_images/noimage_t.png';

export default class Catalog extends Component{
    constructor(props){
        super(props);

        this.toggleThumb = this.toggleThumb.bind(this);
        this.thumbLoaded = this.thumbLoaded.bind(this);
        this.fullLoaded = this.fullLoaded.bind(this);

        
        this.state = {
            is_thumb: true,
            thumb_loaded: false,
            full_loaded: false,
        };
    }

    componentDidMount(){

    }

    toggleThumb(){
        if(this.state.is_thumb){
            this.setState({
                is_thumb: false
            })
        }else{
            this.setState({
                is_thumb: true
            })}
        //^^chimplike but react crashes doing it the normal way
    }

    thumbLoaded(){
        this.setState({
            thumb_loaded: true
        })
    }
    fullLoaded(){
        this.setState({
            full_loaded: true
        })
    }
   
    render(){
        return(
            <div onClick={this.toggleThumb} style={{cursor:"pointer"}}>
                {(this.state.is_thumb) ? 
                (//if use thumb
                    <div>
                        {!this.state.thumb_loaded && // if loading thumb
                            <div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div>
                        }
                        <LazyLoadImage 
                        src={this.props.thumbimg} 
                        // onError={this.imageError()} as it stands now, bc this isn't an img tag
                        //I can't use onError, 
                        // so the circles must spin forever (;__;),b
                        // to write this back in, add state over what the image should be, and an 'errored' flag
                        alt={""}
                        style={{maxWidth:"100%"}}
                        onLoad={this.thumbLoaded}
                        />
                    </div>
                )
                :
                (//if using full image
                    <div>
                        {!this.state.full_loaded && // if loading thumb
                            <div className="spinner-border" role="status"></div>
                        }
                        <LazyLoadImage 
                        src={this.props.fullimg}
                        alt={<div className="spinner-border" role="status" />}
                        style={{maxWidth:"100%"}}
                        onLoad={this.fullLoaded}
                         />
                        
                    </div>
                )

                }
            </div>
        );
    }
}
