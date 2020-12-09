import React, {Component} from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default class Catalog extends Component{
    constructor(props){
        super(props);

        this.state = {
            is_thumb: true,
            thumb_loaded: false,
            full_loaded: false
        };

        this.toggleThumb = this.toggleThumb.bind(this);
        this.thumbLoaded = this.thumbLoaded.bind(this);
        this.fullLoaded = this.fullLoaded.bind(this);
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
                            <div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>
                        }
                        <LazyLoadImage 
                        src={this.props.thumbimg} 
                        alt={<div className="spinner-border" role="status" />}
                        style={{maxWidth:"100%"}}
                        onLoad={this.thumbLoaded}
                        />
                    </div>
                )
                :
                (//if using full image
                    <div>
                        {!this.state.full_loaded && // if loading thumb
                            <div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>
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
