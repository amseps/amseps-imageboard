import React, {Component} from 'react';
import {Fade} from 'react-reveal';

export default class Rules extends Component{
    render(){
        return(
            <div>
                <div className="container d-flex flex-column justify-content-center">
                    <div style={{paddingTop:"8vh", width:"120%", marginLeft:"-10%"}}>
                        <Fade className="c-max-width">
                            <div className="c-border c-max-width">
                                <div className="c-padding-md column justify-content-start">
                                    <h1 className="c-underline">rules / howto</h1>
                                    <div classname="container" style={{padding:"5%"}}>
                                        <h3>how to be succesful on this website</h3>
                                        <ol>
                                            <li>posting interesting and unique content</li>
                                            <li>comedy</li>
                                            <li>niceposting and checking dubs</li>
                                        </ol>
                                        <h3 style={{marginTop:"5%"}}>how to get sent to jail:</h3>
                                        <ol>
                                            <li>posting images that violate U.S. law</li>
                                            <li>discussing subjects that violates U.S. law</li>
                                            <li>helping other users find content that violates U.S. law</li>
                                        </ol>
                                        <h3 style={{marginTop:"5%"}}>how to get permabanned:</h3>
                                        <ol>
                                            <li>causing severe issues in the community</li>
                                            <li>abusing the service or users</li>
                                            <li>impersonating a moderator</li>
                                            <li>malicious spamming</li>
                                            <li>ban evasion</li>
                                        </ol>
                                        <h3 style={{marginTop:"5%"}}>how to get temporarily banned:</h3>
                                        <ol>
                                            <li>using this website while being under the age of 18</li>
                                            <li>posting grotesque content</li>
                                            <li>posting smut</li>
                                            <li>being annoying</li>
                                        </ol>
                                        <h3 style={{marginTop:"5%"}}>how to get image muted:</h3>
                                        <ol>
                                            <li>posting questionable content</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    </div>
                </div>
            </div>
        );
    }
}