import React, {Component} from 'react';
import {Fade} from 'react-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { InView } from "react-intersection-observer"; // 1.9K gzipped

import burry_1 from './../common_images/burry_square.png'
import burry_2 from './../common_images/burry_ownsmylife.jpg'

export default class Home extends Component{

    constructor(props){
        super(props);

        this.state={
            inview_1: false,
            inview_2: false,
            inview_3: false,
            inview_4: false,
            inview_5: false,
            inview_6: false,
        }
    }

    render(){
        return(
            <div>
                <div className="container d-flex flex-column justify-content-center">
                    <div style={{height:"100vh"}}>
                        <Fade left className="c-max-width">
                            <div className="c-border c-max-width" style={{marginTop:"10%"}}>
                                <div className="c-padding-md row justify-content-start" style={{marginLeft:"-8%"}}>
                                    <div>
                                        <LazyLoadImage src={burry_1} />
                                    </div>
                                    <div className="flex-grow-1">
                                        <h1 className="c-underline">hello young fellow</h1>
                                        <h5 style={{marginTop:"2%", marginLeft:"2%"}}>welcome to 5ovdra</h5>
                                        <h6 style={{marginLeft:"4%"}}>where fun is mandatory</h6>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    </div>
                    <div>
                        <div>
                            <Fade left className="c-max-width" when={this.state.inview_1}>
                                <div className="c-border c-max-width">
                                    <div className="c-padding-md row justify-content-start" style={{marginLeft:"-8%"}}>
                                        <div>
                                            <LazyLoadImage src={burry_1} />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h1 className="c-underline">computers</h1>
                                            <h6 style={{marginTop:"2%", marginLeft:"2%"}}>nobody really likes them</h6>
                                        </div>
                                    </div>
                                </div>
                            </Fade>
                            <InView as="div" onChange={(inView,entry)=>this.setState({inview_1:true})}/>
                        </div>
                    </div>
                    <div style={{paddingTop:"8vh"}}>
                        <Fade right className="c-max-width" when={this.state.inview_2}>
                            <div className="c-border c-max-width">
                                <div className="c-padding-md row justify-content-start" style={{marginRight:"-8%"}}>
                                    <div className="flex-grow-1">
                                        <h1 className="c-underline" style={{width:"97%"}}>because they are dumb</h1>
                                        <h6 style={{marginTop:"2%", marginLeft:"2%"}}>and also are not fun</h6>
                                    </div>
                                    <div>
                                        <LazyLoadImage src={burry_1}/>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                        <InView as="div" onChange={(inView,entry)=>this.setState({inview_2:true})}/>
                    </div>
                    <div style={{paddingTop:"8vh"}}>
                        <Fade left className="c-max-width" when={this.state.inview_3}>
                            <div className="c-border c-max-width">
                                <div className="c-padding-md row justify-content-start" style={{marginLeft:"-8%"}}>
                                    <div>
                                        <LazyLoadImage src={burry_1} />
                                    </div>
                                    <div className="flex-grow-1">
                                        <h1 className="c-underline">that is why</h1>
                                        <h6 style={{marginTop:"2%", marginLeft:"2%"}}>fun is mandatory on this website</h6>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                        <InView as="div" onChange={(inView,entry)=>this.setState({inview_3:true})}/>
                    </div>
                    <div style={{paddingTop:"8vh"}}>
                        <Fade right className="c-max-width" when={this.state.inview_4}>
                            <div className="c-border c-max-width">
                                <div className="c-padding-md row justify-content-start" style={{marginRight:"-8%"}}>
                                    <div className="flex-grow-1">
                                        <h1 className="c-underline" style={{width:"97%"}}>and if you don't have fun</h1>
                                        <h6 style={{marginTop:"2%", marginLeft:"2%"}}>you will be banned xd</h6>
                                    </div>
                                    <div>
                                        <LazyLoadImage src={burry_1}/>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                        <InView as="div" onChange={(inView,entry)=>this.setState({inview_4:true})}/>
                    </div>
                    <div style={{paddingTop:"8vh", width:"120%", marginLeft:"-10%"}}>
                        <InView as="div" onChange={(inView,entry)=>this.setState({inview_5:true})}/>
                        <Fade className="c-max-width" when={this.state.inview_5}>
                            <div className="c-border c-max-width">
                                <div className="c-padding-md column justify-content-start">
                                    <h1 className="c-underline">so if you're ready, here's some quick facts</h1>
                                    <div classname="container" style={{padding:"5%"}}>
                                        <h3>likes destroy your brain</h3>
                                        <h6 style={{marginLeft:"2%"}}>likes are a dopamine roulette composed by scientists to control your emotions</h6>
                                        <h3 style={{marginTop:"4%"}}>your emotions are controlled to sell you garbage</h3>
                                        <h6 style={{marginLeft:"2%"}}>which is understandable but also lame</h6>
                                        <h3 style={{marginTop:"4%"}}>it all makes you wonder how in control one really is</h3>
                                        <h6 style={{marginLeft:"2%"}}>but that's a seperate discussion</h6>
                                        <h3 style={{marginTop:"4%"}}>the point is, this website uses as little social engineering as possible</h3>
                                        <h6 style={{marginLeft:"2%"}}>and that's achieved in the following ways:</h6>
                                        <ol>
                                            <li><b>NOT</b> using a binary voting system <i> [ie like/dislike , upvote/downvote]</i></li>
                                            <li><b>NEVER</b> sending any notifications</li>
                                            <li><b>FORBIDDING</b> smut</li>
                                            <li><b>DISALLOWING</b> users from gaining a quantitative reputation <i>[ie followers, karma]</i></li>
                                            <li><b>DEFAULTING</b> towards anonymity</li>
                                        </ol>
                                        <h3 style={{marginTop:"4%"}}>but to some extent there are some engineering practices in place</h3>
                                        <h6 style={{marginLeft:"2%"}}>specifically:</h6>
                                        <ol>
                                            <li>a count of your recieved votes<ul>but this is not public, transferable, meaningful, or useful</ul></li>
                                            <li>(you)'s<ul>but this is more utilitarian than anything else</ul></li>
                                        </ol>
                                        <h3 style={{marginTop:"4%"}}>we're not out for blood here</h3>
                                        <h6 style={{marginLeft:"2%"}}>just turn off your adblock pls (;__;),b</h6>
                                        <h3 style={{marginTop:"4%"}}>but past all of that, this website is trying to be your new go-to anonymous imageboard</h3>
                                        <h6 style={{marginLeft:"2%"}}>go check out the links on the headerbar! There's a lot of unique things to see</h6>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    </div>
                    <div style={{height:"100vh", marginTop:"40vh"}}>
                        <InView as="div" onChange={(inView,entry)=>this.setState({inview_6:true})}/>
                        <Fade left className="c-max-width" when={this.state.inveiw_6}>
                            <div className="c-border c-max-width" style={{marginTop:"10%"}}>
                                <div className="c-padding-md row justify-content-start" style={{marginLeft:"-8%"}}>
                                    <div>
                                        <LazyLoadImage src={burry_1} />
                                    </div>
                                    <div className="flex-grow-1">
                                        <h1 className="c-underline">if you read all that, you're all set!</h1>
                                        <h6 style={{marginLeft:"4%"}}>and don't forget to have fun!</h6>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    </div>
                    <div style={{height:"100vh"}}>
                        <InView as="div" onChange={(inView,entry)=>this.setState({inview_7:true})}/>
                        <Fade left className="c-max-width" when={this.state.inveiw_7}>
                            <div className="c-border c-max-width" style={{marginTop:"10%"}}>
                                <div className="c-padding-md row justify-content-start" style={{marginLeft:"-8%"}}>
                                    <div>
                                        <LazyLoadImage src={burry_1} />
                                    </div>
                                    <div className="flex-grow-1">
                                        <h6 style={{marginLeft:"4%"}}>mandatory</h6>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    </div>
                    <div style={{height:"100vh"}}>
                        <InView as="div" onChange={(inView,entry)=>this.setState({inview_8:true})}/>
                        <Fade className="c-max-width" when={this.state.inveiw_8}>
                                <LazyLoadImage src={burry_2} />
                        </Fade>
                    </div>
                </div>
            </div>
        );
    }
}